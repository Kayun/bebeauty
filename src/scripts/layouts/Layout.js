import Backbone from 'backbone';

function Layout(options) {
  'use strict';

  Backbone.View.apply(this, arguments);

  this.$layout = this.layout ? $(this.layout()) : $();
  this.layout = this._initLayoutProperty();

  if (_.isObject(options) && options !== undefined) {
    this.options = options;
  }

  this._entry = this._initEntryPoints();
  this._insertViewElement();

  return this;
}

Layout.extend = Backbone.View.extend;

Layout.prototype = Object.create(Backbone.View.prototype);

Object.assign(Layout.prototype, {

  _initLayoutProperty() {
    'use strict';

    if (this.$layout.get(0) !== undefined) {
      return this.$layout.get(0);
    }

    const element = document.createElement('div');
    element.dataset.entry = _.uniqueId('entry');

    this.$layout = $(element);

    return element;
  },

  _initEntryPoints() {
    'use strict';

    const $entries = this.$layout.find('[data-entry]');
    const entry = {};

    if (!$entries.length) {
      return {};
    }

    $entries.each(function () {
      const name = $(this).data('entry');
      if (name === '') {
        $(this).data('entry', _.uniqueId('entry'));
      }
      entry[$(this).data('entry')] = $(this);
    });

    return entry;
  },

  // TODO: написать тесты для функции

  _insertViewElement() {
    'use strict';

    if (_.isEmpty(this.entry)) {
      return false;
    }

    const entriesName = this.getEntryNames();

    for (const name of entriesName) {
      const view = this.entry[name];
      if (_.isUndefined(view)) {
        continue;
      }
      this._entry[name].append(view.el);
      $('#fixtures').html(this.$layout);
    }
  },

  getEntryNames() {
    'use strict';

    return _.keys(this._entry);
  }
});

export default Layout;
