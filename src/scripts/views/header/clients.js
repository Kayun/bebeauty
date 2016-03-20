'use strict';

import headerBehaviors from '../../behaviors/header';

export default Marionette.ItemView.extend({
  template: false,

  el: '.js-header-clients',

  behaviors: {
    clientCount: {
      behaviorClass: headerBehaviors
    }
  },

  update(num, msg, isActive) {
    this.$el
      .attr('title', msg)
      .text(num);

    if (isActive) {
      this.$el.addClass('header__note_state_active');
    } else {
      this.$el.removeClass('header__note_state_active');
    }
  }
});
