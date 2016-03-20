'use strict';
/*
 * DOM navigation v 0.1.0
 */

const DOM = {

  id(id) {
    return document.getElementById(id);
  },

  tag(tagName, context = document) {
    const sample = context.getElementsByTagName(tagName);
    if (sample.length === 1) {
      return sample[0];
    }
    return Array.from(sample);
  },

  className(className, context = document) {
    const sample = context.getElementsByClassName(className);
    if (sample.length === 1) {
      return sample[0];
    }
    return Array.from(sample);
  },

  selector(selector, context = document) {
    return context.querySelector(selector);
  },

  selectorAll(selector, context = document) {
    const sample = context.querySelectorAll(selector);
    if (sample.length === 1) {
      return sample[0];
    }
    return Array.from(sample);
  },

  htmlBefore(htmlText, sourceElement) {
    sourceElement.insertAdjacentHTML('beforeBegin', htmlText);
  },

  htmlAfter(htmlText, sourceElement) {
    sourceElement.insertAdjacentHTML('afterEnd', htmlText);
  },

  htmlEnd(htmlText, sourceElement) {
    sourceElement.insertAdjacentHTML('beforeEnd', htmlText);
  },

  htmlStart(htmlText, sourceElement) {
    sourceElement.insertAdjacentHTML('afterBegin', htmlText);
  },

  elementBefore(element, sourceElement) {
    sourceElement.insertAdjacentElement('beforeBegin', element);
    return element;
  },

  elementAfter(element, sourceElement) {
    sourceElement.insertAdjacentElement('afterEnd', element);
    return element;
  },

  elementEnd(element, sourceElement) {
    sourceElement.insertAdjacentElement('beforeEnd', element);
    return element;
  },

  elementStart(element, sourceElement) {
    sourceElement.insertAdjacentElement('afterBegin', element);
    return element;
  },

  fadeIn(element, delay, callback) {
    const endHandler = function handler() {
      element.removeEventListener('transitionend', handler);
      element.classList.add('l-hidden');
      if (callback) {
        callback();
      }
    };
    setTimeout(() => {
      element.classList.remove('l-fade-out');
      element.classList.add('l-fade-in');
    }, delay || 0);

    element.addEventListener('transitionend', endHandler);
  },

  fadeOut(element, delay, callback) {
    const endHandler = function handler() {
      element.removeEventListener('transitionend', handler);
      if (callback) {
        callback();
      }
    };
    element.classList.remove('l-hidden');

    setTimeout(() => {
      element.classList.remove('l-hidden');
      element.classList.remove('l-fade-in');
      element.classList.add('l-fade-out');
    }, delay || 0);

    element.addEventListener('transitionend', endHandler);
  },

  fadeBlink(element, callback) {
    this.fadeIn(element, 0, () => {
      if (callback) {
        callback();
      }
      this.fadeOut(element);
    });
  }
};

export default DOM;
