'use strict';

import Backbone from 'backbone';
import LayoutLoginView from 'layouts/login';

Backbone.View.extend({
  initialize() {
    console.log(this);
  },
  render() {
    const layout = new LayoutLoginView();
    layout.render();
  }
});
