import browserSync from 'browser-sync';
import gulp from 'gulp';
import gutil from 'gulp-util';
import debuga from 'debuga';

gulp.task('server', done => {
  browserSync.init({
    files: ['public/**/*.*'],
    open: !!gutil.env.open,
    reloadOnRestart: true,
    port: 3000,
    reloadDelay: 300,
    server: {
      baseDir: [
        'src/resources',
        'public'
      ],
      directory: true
    }
  });
  done();
});
