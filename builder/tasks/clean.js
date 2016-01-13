'use strict';

import gulp from 'gulp';
import del from 'del';
import gutil from 'gulp-util';
import config from '../builder.config.js';

gulp.task('clean', done => {
  del(config.path.dist).then(() => {
    gutil.log(gutil.colors.green('Delete folder ' + config.path.dist));
    done();
  });
});
