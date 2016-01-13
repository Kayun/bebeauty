import browserSync from 'browser-sync';
import gulp from 'gulp';
import gutil from 'gulp-util';
import debuga from 'debuga';

gulp.task('server', done => {
  browserSync.init({
    files: ['public/**/*'],
    open: !!gutil.env.open,
    reloadOnRestart: true,
    port: gutil.env.port || 3000,
    reloadDelay: 100,
    logLevel: "debug",
    server: {
      baseDir: [
        'src/resources',
        'public'
      ],
      directory: false,
      middleware: process.env.NODE_ENV === 'development' ? [debuga()] : []
    },
    tunnel: !!gutil.env.tunnel
  });
  done();
});
