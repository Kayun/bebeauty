Marionette.Renderer.render = (template, data) => {
  return template(data);
};

Marionette.Behaviors.behaviorsLookup = () => {
  return App.Behaviors;
};

Backbone.Model.prototype.parse = res => {
  return res.error ? {} : res.data;
};
