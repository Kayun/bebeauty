export default {
  link(event, router) {
    'use strict';

    event.preventDefault();
    const href = $(this).attr('href');

    if (router) {
      router.navigate(href, {trigger: true});
    } else {
      Backbone.history.navigate(href, {trigger: true});
    }

  }
};

