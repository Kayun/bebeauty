'use strict';

import Backbone from 'backbone';
import App from 'namespace';
import login from 'layouts/login';

App.Layout.Login = login;

export default Backbone.Router.extend({

  routes: {
    login: 'login'
  },

  login() {
    const view = new App.Layout.Login();
    console.log(view);
    view.render();
  }
});
