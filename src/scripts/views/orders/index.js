'use strict';

import template from './template';
import TicketView from 'views/ticket';

export default Marionette.CompositeView.extend({
  template,
  className: 'order',
  childViewContainer: '.order-container',
  childView: TicketView
});
