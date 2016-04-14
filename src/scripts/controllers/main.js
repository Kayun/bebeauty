'use strict';

import App from 'namespace';
import OrderCollection from 'collections/orders';
import OrderView from 'views/orders';
import MainLayout from 'layouts/main';

export default {
  main() {
    App.View.Menu.setCurrentPage(0);

    const orderCollection = new OrderCollection();
    const mainLayout = new MainLayout();
    const orderView = new OrderView({collection: orderCollection});
    App.Layout.Default.showChildView('content', mainLayout);

    orderCollection.fetch({
      success(collection) {
        mainLayout.showChildView('order', orderView);
        console.log(collection);
      },
      reset: true
    });
  }
};
