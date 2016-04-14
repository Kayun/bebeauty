'use strict';

import model from 'models/ticket';

export default Backbone.Collection.extend({
  model,

  url: 'data/orders/orders.json',

  page: 1,

  pageCout() {
    this.page++;
  },

  set(res) {
    Backbone.Collection.prototype.set.call(this, this.parse(res));
  },

  fetch(options) {
    const params = $.extend(true, options, {
      data: {
        page: this.page
      }
    });
    Backbone.Collection.prototype.fetch.call(this, params);
  }
});
