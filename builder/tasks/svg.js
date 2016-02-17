'use strict';

import gulp from 'gulp';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import path from 'path';
import svgSymbols from 'gulp-svg-symbols';
import errorHandler from '../helpers/errorHandler.js'
import config from '../builder.config.js'

const svg = done => {
  gulp.src(config.svgIcon.src)
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
