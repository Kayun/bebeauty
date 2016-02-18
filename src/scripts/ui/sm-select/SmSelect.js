'use strict';

import DOM from '../../utils/dom';
import buttonTemplate from './button';
import dropdownTemplate from './dropdown';
import optionTemplate from './option';

function SmSelect(select, options = {}) {
  const that = this;
  const clickBodyHandler = function bodyHandler(event) {
    const elem = event.target.closest(`.${that._scope}`);
    if (elem) {
      return false;
    }

    that.close();
    this.removeEventListener('click', bodyHandler, false);
    that.dropdown.removeEventListener('click', bodyHandler, false);
  };

  const dropdownHandler = function handler(event) {

    const item = event.target.closest('li');
    const index = Number(item.dataset.index);
    const eventChange = document.createEvent('Event');

    if (!item || !that.dropdown.contains(item)) {
      return false;
    }

    that.target.selectedIndex = index;
    that._dataSync(index);

    eventChange.initEvent('change', true, true);

    that.instance.dispatchEvent(eventChange);
    this.removeEventListener('click', handler, false);
    document.body.removeEventListener('click', clickBodyHandler, false);
  };

  let isInit = false;

  this.target = select;
  this.options = Object.assign(this.default, select.dataset, options);
  console.log(this.options);
  Object.defineProperty(this.target, 'getSmSelect', {
    get() {
      return this;
    }
  });

  this._scope = this._getScope();
  this.target.classList.add(`${this._scope}__target`);
  this.instance = document.createElement('div');
  this.instance.className = this._scope;
  this.instance.innerHTML = this._getHtml();
  DOM.elementAfter(this.instance, this.target);
  DOM.elementStart(this.target, this.instance);
  this.state = 'close';
  this.button = DOM.tag('button', this.instance);
  this._current = DOM.className(`${this._scope}__current`, this.button);
  this._plc = DOM.className(`${this._scope}__plc`, this.button);
  this.dropdownContainer = DOM.selector(this.options.container) || this.instance;

  this._resetSelect();
  this.data = this._getData();
  this._plcVisibility();



  this.instance.addEventListener('click', event => {
    const target = event.target;
    const button = target.closest('button');
    if (!button || !this.instance.contains(button)) {
      return false;
    }

    if (!isInit) {
      DOM.htmlEnd(this._genHtmlDropdown(), this.dropdownContainer);
      this.dropdown = DOM.className(`${this._scope}-dropdown`, this.dropdownContainer);
      isInit = true;
    }

    switch (this.state) {

    case 'close':
      this.show();
      document.body.addEventListener('click', clickBodyHandler, false);
      this.dropdown.addEventListener('click', dropdownHandler, false);
      break;

    case 'open':
      this.close();
      break;
    }
  }, false);

  this.instance.addEventListener('change', event => {
    const target = event.target;
    const button = target.closest('select');
    if (button || this.instance.contains(button)) {
      this._currentText(target[target.selectedIndex].text);
    }

    if (target === this.instance) {
      this._currentText(this.target[this.target.selectedIndex].text);
    }
    this._plcVisibility();
    this.close();

  }, false);
}

SmSelect.prototype.show = function () {
  const event = new CustomEvent('sm.select.show', {
    bubbles: true,
    cancelable: true,
    detail: {
      smObject: this,
      smInstance: this.instance,
      smDropdown: this.dropdown
    }
  });

  this.instance.classList.add(`${this._scope}_state_open`);
  this.dropdown.classList.add(`${this._scope}-dropdown_state_open`);

  this.state = 'open';

  this.instance.dispatchEvent(event);
};

SmSelect.prototype.close = function () {
  const event = new CustomEvent('sm.select.close', {
    bubbles: true,
    cancelable: true,
    detail: {
      smObject: this,
      smInstance: this.instance,
      smDropdown: this.dropdown
    }
  });

  this.instance.classList.remove(`${this._scope}_state_open`);
  this.dropdown.classList.remove(`${this._scope}-dropdown_state_open`);

  this.state = 'close';

  this.instance.dispatchEvent(event);
};

SmSelect.prototype._dataSync = function (index) {
  for (let i = 0; i < this.data.length; i++) {
    this.data[i].selected = i === index;
  }
};

SmSelect.prototype._resetSelect = function () {
  const selected = DOM.selector('[selected]', this.target);
  if (!selected) {
    this.target.value = 0;
  }
};

SmSelect.prototype._plcVisibility = function () {
  if (this.target.selectedIndex === -1) {
    this._plc.classList.remove(`${this._scope}__plc_state_hidden`);
  } else {
    this._plc.classList.add(`${this._scope}__plc_state_hidden`);
  }
};

SmSelect.prototype._getHtml = function () {
  return this._buttonTemplate({
    scope: this._scope,
    placeholder: this.default.placeholder
  });
};

SmSelect.prototype._genHtmlOption = function (data) {
  data.scope = this._scope;
  return this._optionTemplate(data);
};

SmSelect.prototype._genHtmlDropdown = function () {
  let optionsHtml = '';

  for (const option of this.data) {
    optionsHtml += this._genHtmlOption(option);
  }

  return this._dropdownTemplate({options: optionsHtml, scope: this._scope});
};

SmSelect.prototype._currentText = function (text) {
  this._current.innerHTML = text;
};

SmSelect.prototype._getData = function () {
  const selectData = [];

  for (const option of Array.from(this.target.options)) {
    const optionData = {
      text: option.text,
      selected: option.selected,
      index: option.index
    };

    if (option.selected) {
      this._currentText(option.text);
    }
    selectData.push(optionData);
  }

  return selectData;
};

SmSelect.prototype.default = SmSelect.default = {
  postfix: null,
  placeholder: 'Выберите...'
};

SmSelect.prototype._prefix = SmSelect._prefix = 'sm';

SmSelect.prototype._getScope = function () {
  const prefix = this._prefix ? `${this._prefix}-` : '';
  const postfix = this.options.postfix ? `-${this.options.postfix}` : '';

  return `${prefix}select${postfix}`;
};

SmSelect.prototype._buttonTemplate = buttonTemplate;
SmSelect.prototype._dropdownTemplate = dropdownTemplate;
SmSelect.prototype._optionTemplate = optionTemplate;

export default SmSelect;
