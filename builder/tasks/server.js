import browserSync from 'browser-sync';
import gulp from 'gulp';
import gutil from 'gulp-util';
import debuga from 'debuga';

gulp.task('server', done => {
  browserSync.init({
    files: ['public/**/*.*'],
    open: !!gutil.env.open,
    reloadOnRestart: true,
    port: 3001,
    reloadDelay: 300,
    proxy: 'http://localhost:3000'
  });
  done();
});
