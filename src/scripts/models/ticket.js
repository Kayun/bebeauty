'use strict';

export default Backbone.Model.extend({
  idAttribute: '_id',
  initialize(options) {
    console.log(options);
  }
});
