'use strict';

import template from './login';
import Layout from '../layout';
import App from 'namespace';

export default Layout.extend({
  el: '#app',
  layout: template,
  entryPoints: {},
  initialize() {
    this.entryPoints.selector = new App.View.Form.Selector({model: 'test2', name: 'test1'});
    // this.$layout.find('.login-form').append(this.entryPoints.selector.el);
  },

  render() {
    this.entryPoints.selector.render();
    this.$el.html(this.layout);
  }
});
