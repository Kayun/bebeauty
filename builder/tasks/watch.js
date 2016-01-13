'use strict';

import gulp from 'gulp';
import {reload} from 'browser-sync';
import watch from 'gulp-watch';
import styles from './styles.js';
import templates from './templates.js';


gulp.task('watch', () => {
  watch('src/styles/**/*.styl', gulp.series(styles, () => reload('assets/styles/common.min.css')));
  watch('src/templates/**/*.jade', gulp.series(templates, reload));
});
