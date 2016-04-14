'use strict';

export default Marionette.Behavior.extend({
  modelEvents: {
    'support:count': 'supportNotice',
    'client:count': 'clientCount',
    'change:pageId': 'changeSections'
  },

  supportNotice(data) {
    const count = data.new;
    let msg = '';

    if (!count) return this.view.update('Техническая поддержка', false);

    if (count % 10 === 1 && count !== 11) {
      msg = `У Вас ${count} непрочитанное сообшение`;
    } else if (count % 10 >= 2 && count % 10 < 5 && (count < 12 || count >= 15)) {
      msg = `У Вас ${count} непрочитанных сообшения`;
    } else {
      msg = `У Вас ${count} непрочитанных сообшений`;
    }

    return this.view.update(msg, true);
  },

  clientCount(data) {
    const count = data.new;
    let msg = '';

    if (!count) return this.view.update(0, 'У Вас нет новых клиентов', false);

    if (count % 10 === 1 && count !== 11) {
      msg = `У Вас ${count} новый клиент`;
    } else if (count % 10 >= 2 && count % 10 < 5 && (count < 12 || count >= 15)) {
      msg = `У Вас ${count} новых клиента`;
    } else {
      msg = `У Вас ${count} новых клиентов`;
    }

    return this.view.update(count, msg, true);
  },

  changeSections(modal, value) {
    const $links = this.view.$el.find('.js-menu-link');
    const $currentLink = $links.filter('[href="#"]');
    const $activeLink = $links.filter(`[data-id="${value}"]`);

    $currentLink
      .attr('href', $currentLink.data('href'))
      .removeClass('menu__wrap').addClass('menu__link')
      .find('.js-menu-item').removeClass('menu__item_state_active');

    $activeLink
      .attr('href', '#')
      .addClass('menu__wrap').removeClass('menu__link')
      .find('.js-menu-item').addClass('menu__item_state_active');
  }
});
