export default Backbone.Model.extend({
  urlRoot: '/data/clients/',
  url() {
    return `${this.urlRoot}new.json`; // ?fields=(meta:new)
  }
});
