import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import config from '../../webpack.config.js';

const scripts = done => {
  webpack(
    config,
    (error, stats) => {
      gutil.log(stats.toString({
        hasError: true,
        colors: true,
        chunkModules: true,
        reasons: false
      }));
    }
  );
  done();
};

gulp.task('scripts', scripts);
export default scripts;
