'use strict';

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gutil from 'gulp-util';
import gulpif from 'gulp-if';
import rupture from 'rupture';
import axis from 'axis';
import stylus from 'gulp-stylus';
import autoprefixer from 'gulp-autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import csso from 'gulp-csso';
import csscomb from 'gulp-csscomb';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import errorHandler from '../helpers/errorHandler.js';
import notify from 'gulp-notify';
import config from '../builder.config.js';

const NODE_ENV = process.env.NODE_ENV || 'development';

const styles = done => {
  gulp.src(config.styles.entry, {
    cwd: config.styles.src
  })
    .pipe(plumber({errorHandler}))
    .pipe(sourcemaps.init({debug: NODE_ENV == 'development'}))
    .pipe(stylus({
      use: [
        rupture(),
        axis()
      ]
    }))
    .pipe(autoprefixer({
      browsers: config.browsers,
      cascade: false
    }))
    .pipe(NODE_ENV == 'production' ? gcmq() : gutil.noop())
    .pipe(NODE_ENV == 'production' ? csso() : gutil.noop())
    .pipe(gulpif(gutil.env.csscomb, csscomb()))
    .pipe(rename({suffix: '.min'}))
    .pipe(NODE_ENV == 'development' ? sourcemaps.write() : gutil.noop())
    .pipe(
      NODE_ENV == 'production' ?
      sourcemaps.write('../' + config.sourcemaps.dist, {
        sourceMappingURLPrefix: config.sourcemaps.url
      }) :
      gutil.noop())
    .pipe(gulp.dest(config.styles.dist));

  done();
};

gulp.task('styles', styles);
export default styles;
