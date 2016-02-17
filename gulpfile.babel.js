'use strict';

import gulp from 'gulp';
import HubRegistry from 'gulp-hub';

const hub = new HubRegistry(['builder/tasks/*.js']);
gulp.registry(hub);

gulp.task('default',
  gulp.series(
    'build',
    gulp.parallel('server', 'watch')
  )
);

gulp.task('styles:dep', gulp.series('svg', 'styles'));

gulp.task('build',
  gulp.series(
    'clean',
    gulp.parallel('styles:dep', 'templates', 'copy', 'scripts')
  )
);
