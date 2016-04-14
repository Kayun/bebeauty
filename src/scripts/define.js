'use strict';

import DataFetchError from 'errors/dataFetchError';

Marionette.Renderer.render = (template, data) => {
  return template(data);
};

Marionette.Behaviors.behaviorsLookup = () => {
  return App.Behaviors;
};

const parse = res => {
  return res.error ? {} : res.data;
};

Backbone.Model.prototype.parse = parse;
Backbone.Collection.prototype.parse = parse;

Backbone.Model.prototype.parse = res => {
  return res.error ? {} : res.data;
};

const oldSync = Backbone.sync;

Backbone.sync = (method, model, options) => {

  const params = {
    error(xhr, res, errorObj) {
      try {
        JSON.parse(xhr.responseText);
      } catch (error) {
        if (errorObj instanceof SyntaxError) {
          throw new DataFetchError('Синтаксическая ошибка в полученных данных', error);
        } else if (errorObj instanceof URIError) {
          throw new DataFetchError('Ошибка а URI', error);
        } else {
          throw error;
        }
      }
    }
  };

  $.extend(true, options, params);
  oldSync.apply(this, [method, model, options]);
};
