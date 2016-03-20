import gulp from 'gulp';

const resources = done => {
  gulp.src(['src/resources/**/*', '!src/resources/data/**/*'])
    .pipe(gulp.dest('public'));

  done();
};

const data = done => {
  gulp.src('src/resources/data/**/*', {base: 'src/resources'})
    .pipe(gulp.dest('public'));

  done();
};

gulp.task('copy:resources', resources);
gulp.task('copy:data', data);

gulp.task('copy', gulp.parallel(
  'copy:resources',
  'copy:data'
));

export default {
  resources,
  data
};
