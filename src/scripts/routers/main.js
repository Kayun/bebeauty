import controller from 'controllers/main';

export default Marionette.AppRouter.extend({
  controller,
  appRoutes: {
    '(/)': 'main'
  }
});
