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
  }

};

export default DOM;
