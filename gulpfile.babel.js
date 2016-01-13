'use strict';

import gulp from 'gulp';
import HubRegistry from 'gulp-hub';

const hub = new HubRegistry(['builder/tasks/*.js']);
gulp.registry(hub);

gulp.task('default',
  gulp.series(
    gulp.parallel('clean', 'environment'),
    'build',
    'server',
    'watch'
  )
);

gulp.task('build',
  gulp.series('styles', 'templates')
);
