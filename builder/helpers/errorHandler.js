'use strict';

import gutil from 'gulp-util';

export default function (error) {
  gutil.log(gutil.colors.red('\n Building error...'));
  gutil.log(error.toString());
  gutil.beep();

  this.emit("end");
}
