import gulp from 'gulp';

gulp.task('copy', done => {
  gulp.src('src/resources/**/*')
    .pipe(gulp.dest('public'));

  done();
});
