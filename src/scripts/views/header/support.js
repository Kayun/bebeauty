'use strict';

import headerBehaviors from '../../behaviors/header';

export default Marionette.ItemView.extend({
  template: false,

  el: '.js-header-support',

  behaviors: {
    supportNotice: {
      behaviorClass: headerBehaviors
    }
  },

  update(msg, isActive) {
    this.$el.attr('title', msg);
    if (isActive) {
      this.$el.addClass('header-button_state_notice');
    } else {
      this.$el.removeClass('header-button_state_notice');
    }
  }
});
