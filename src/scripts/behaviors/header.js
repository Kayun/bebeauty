'use strict';

export default Marionette.Behavior.extend({
  modelEvents: {
    'support:count': 'supportNotice',
    'client:count': 'clientCount'
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

    if (!count) return this.view.update(0, 'У Вас нет новый клиентов', false);

    if (count % 10 === 1 && count !== 11) {
      msg = `У Вас ${count} новый клиент`;
    } else if (count % 10 >= 2 && count % 10 < 5 && (count < 12 || count >= 15)) {
      msg = `У Вас ${count} новых клиента`;
    } else {
      msg = `У Вас ${count} новых клиентов`;
    }

    return this.view.update(count, msg, true);
  }
});
