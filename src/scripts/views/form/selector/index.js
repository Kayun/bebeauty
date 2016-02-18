'use strict';

import Backbone from 'backbone';
import template from './selector';

export default Backbone.View.extend({
  tagName: 'div',
  className: 'selector',
  template,
  initialize() {
  },
  render() {
    this.$el.html(this.template());
  }
});


