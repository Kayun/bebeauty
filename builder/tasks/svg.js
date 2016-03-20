'use strict';

import gulp from 'gulp';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import path from 'path';
import plumber from 'gulp-plumber';
import svgSymbols from 'gulp-svg-symbols';
import config from '../builder.config.js';
import notify from 'gulp-notify';

const svg = done => {
  gulp.src(config.svgIcon.src)
    .pipe(plumber({
      errorHandler: notify.onError(err => {
        return {
          title: 'SVG sprite',
          message: err.message
        };
      })
    }))
    .pipe(svgSymbols({
      title: false,
      id: 'icon-%f',
      className: '%f',
      templates: [
        path.join(__dirname, '../helpers/svg-sprite.styl'),
        'default-svg'
      ]
    }))
    .pipe(gulpif(/[.]styl$/, gulp.dest('src/styles/helpers/')))
    .pipe(gulpif(/[.]svg$/, rename('icon.svg')))
    .pipe(gulpif(/[.]svg$/, gulp.dest('public/assets/images')));

  done();
};

gulp.task('svg', svg);
export default svg;
