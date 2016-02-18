'use strict';

import './utils/polyfill';
import _ from 'underscore';
import $ from 'exports?Zepto!zepto';
import Backbone from 'backbone';
Backbone.$ = $;
import App from 'namespace';

import workspace from 'routers/workspace';
import form from 'views/form';

App.Router.Workspace = workspace;
App.View.Form = form;

$(function () {
  new App.Router.Workspace();
  Backbone.history.start();
  _.chain();
});

