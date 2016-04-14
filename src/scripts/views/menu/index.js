'use strict';

import headerBehaviors from 'behaviors/header';
import template from './template';

export default Marionette.ItemView.extend({
  template,
  tagName: 'nav',
  className: 'menu',

  ui: {
    link: 'a.menu__link'
  },

  behaviors: {
    changeSections: {
      behaviorClass: headerBehaviors
    }
  },

  setCurrentPage(pageId) {
    this.model.set('pageId', pageId);
  }
});
