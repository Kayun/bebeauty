import template from './template';
import HeaderLayout from 'layouts/header';
import ContentLayout from 'layouts/main';

export default Marionette.LayoutView.extend({
  template,

  el: '#app',

  regions: {
    header: '#header',
    content: '#content',
    sidebar: '#sidebar'
  },

  onBeforeShow() {
    this.showChildView('header', new HeaderLayout());
    this.showChildView('content', new ContentLayout());
  }
});
