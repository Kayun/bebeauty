'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import plumber from 'gulp-plumber';
import jade from 'gulp-jade';
import inheritance from 'gulp-jade-inheritance';
import cached from 'gulp-cached';
import filter from 'gulp-filter';
import rename from 'gulp-rename';
import prettify from 'gulp-html-prettify';
import config from '../builder.config.js';
import notify from 'gulp-notify';

const NODE_ENV = process.env.NODE_ENV || 'development';
const templates = done => {
  gulp.src(`${config.templates.src}/**/*.jade`)
    .pipe(plumber({
      errorHandler: notify.onError(err => {
        return {
          title: 'Jade',
          message: err.message,
          sound: true
        };
      })
    }))
    .pipe(cached('jade'))
    .pipe(NODE_ENV == 'development' ? inheritance({basedir: config.path.src}) : gutil.noop())
    .pipe(filter(file => config.templates.pages.test(file.path)))
    .pipe(jade({data: config.templates.data}))
    .pipe(prettify(config.templates.prettify))
    .pipe(rename(path => {
      /pages[\\\/]static/.test(path.dirname) ? path.dirname = 'static' : path.dirname = '.';
    }))
    .pipe(gulp.dest(config.path.dist));

  done();
};

gulp.task('templates', templates);
export default templates;
