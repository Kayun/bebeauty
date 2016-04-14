'use strict';

import App from 'namespace';
import template from './template';
import SupportView from 'views/header/support';
import ClientsView from 'views/header/clients';
import MenuView from 'views/menu';
import SupportModel from 'models/header/support';
import ClientsModel from 'models/header/clients';

const supportModel = new SupportModel();
const clientsModel = new ClientsModel();
setInterval($.proxy(supportModel, 'fetch', {data: supportModel.params}), 60000);
setInterval($.proxy(clientsModel, 'fetch', {data: clientsModel.params}), 10000);

export default Marionette.LayoutView.extend({
  template,

  // el: '#header',

  regions: {
    search: '.js-header-search',
    menu: '.js-header-menu'
  },

  initialize() {
    this.listenTo(supportModel, 'change', model => {
      supportModel.trigger('support:count', model.get('meta').answer);
    });
    this.listenTo(clientsModel, 'change', model => {
      clientsModel.trigger('client:count', model.get('meta'));
    });
  },

  onBeforeShow() {
    App.View.Menu = new MenuView({model: App.Model.User.clone()});
    this.showChildView('menu', App.View.Menu);
  },

  onShow() {
    new ClientsView({model: clientsModel});
    new SupportView({model: supportModel});
    clientsModel.fetch({data: clientsModel.params});
    supportModel.fetch({data: supportModel.params});
  }
});
