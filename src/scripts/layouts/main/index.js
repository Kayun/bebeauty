import template from './template';

export default Marionette.LayoutView.extend({
  template,
  tagName: 'div',
  className: 'content',

  regions: {
    order: '#order'
  }
});
