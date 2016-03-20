'use strict';

export default Backbone.Model.extend({
  urlRoot: '/data/questions/',
  url() {
    return `${this.urlRoot}answers.json`; // ?fields=(meta:answers)
  }
});
