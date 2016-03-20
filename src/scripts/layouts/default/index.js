import template from './template';
import HeaderView from '../header';

export default Marionette.LayoutView.extend({
  template,

  el: '#app',

  regions: {
    header: '#header',
    content: '#content',
    sidebar: '#sidebar'
  },

  onBeforeShow() {
    this.showChildView('header', new HeaderView());
  }
});
