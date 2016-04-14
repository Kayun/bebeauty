import controller from 'controllers/calendar';

export default Marionette.AppRouter.extend({
  controller,
  appRoutes: {
    'calendar(/)': 'calendar'
  }
});
