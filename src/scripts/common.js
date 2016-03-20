'use strict';

import 'utils/polyfill';
import utils from 'utils';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import LocalStorage from 'backbone.localstorage';
import Marionette from 'backbone.marionette';

Backbone.LocalStorage = LocalStorage;

import 'define';

import namespace from './namespace';
import User from 'models/user';
import MainRoute from 'routers/main';
import DefaultLayout from 'layouts/default';

const App = window.App = new Marionette.Application({
  regions: {
    main: 'body'
  }
});

_.extend(App, namespace);

App.Model.User = new User({id: 'default.json'});

App.on('start', () => {
  new MainRoute();
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


