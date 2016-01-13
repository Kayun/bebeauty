'use strict';

import gulp from 'gulp';
import env from 'gulp-env';
import gutil from 'gulp-util';

gulp.task('environment', done => {
  env({
    vars: {
      NODE_PATH: './src',
      NODE_ENV: gutil.env.type || 'development'
    }
  });

  done();
});
