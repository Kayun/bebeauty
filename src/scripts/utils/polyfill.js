export default (function () {
  'use strict';

  (() => {

    try {
      new CustomEvent('IE support');
    } catch (e) {
      window.CustomEvent = (event, params) => {
        const evt = document.createEvent('CustomEvent');
        params = params || {
          bubbles: false,
          cancelable: false,
          detail: undefined
        };
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      };

      CustomEvent.prototype = Object.create(window.Event.prototype);
    }

  })();

})();
