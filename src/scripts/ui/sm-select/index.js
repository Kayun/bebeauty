'use strict';

import DOM from '../../utils/dom';
import SmSelect from './SmSelect';

export default (function () {

  document.addEventListener('DOMContentLoaded', function () {
    const selects = DOM.className('js-select');

    for (const select of (selects instanceof Array ? selects : [selects])) {
      new SmSelect(select);
    }
  });

})();

