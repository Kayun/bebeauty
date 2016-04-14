'use strict';

import 'utils/polyfill';
import utils from 'utils';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
// import LocalStorage from 'backbone.localstorage';
import Marionette from 'backbone.marionette';

// Backbone.LocalStorage = LocalStorage;

import 'define';
import namespace from 'namespace';
import User from 'models/user';
import MainRoute from 'routers/main';
import CalendarRoute from 'routers/calendar';
import DefaultLayout from 'layouts/default';

const App = new Marionette.Application({
  regions: {
    main: 'body'
  }
});
_.extend(App, namespace);


new MainRoute();
new CalendarRoute();

App.Model.User = new User({id: 'default.json'});

App.on('start', () => {
  App.Layout.Default = new DefaultLayout();
  App.getRegion('main').show(App.Layout.Default);
  Backbone.history.start({pushState: true});
});

App.Model.User.fetch({
  success() {
    App.start();
  }
});

$(document).on('click', 'a', utils.link);


