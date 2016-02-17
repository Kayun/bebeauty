import {assert} from 'chai';
import 'chai-jquery';

import Layout from 'layouts/layout';
import Selector from 'views/form/selector';
import layoutWithEntry from './fixtures/layout-with-entry.fixture.jade';
import layoutWithoutEntry from './fixtures/layout-without-entry.fixture.jade';
import layoutMixinEntry from './fixtures/layout-mixin-entry.fixture.jade';

export default function () {
  'use strict';

  describe('Класс Layout', () => {

    describe('Конструктор new Layout()', () => {

      it('Создание экземпляра класса без параметров', () => {
        const ExtendLayout = Layout.extend({
          layout: layoutWithEntry,
          entry: {
            first: new Selector(),
            second: new Selector()
          }
        });

        const instance = new ExtendLayout();

        assert.ok(instance, 'Ошибка при создании экземпляра класса Layout');
      });

      it('Создание экземпляра класса с параметрами', () => {
        const params = {
          test1: 'test1',
          test2: 'test2',
          test13: 'test3'
        };
        const ExtendLayout = Layout.extend({
          layout: layoutWithEntry,
          entry: {
            first: new Selector(),
            second: new Selector()
          }
        });

        const instance = new ExtendLayout(params);

        assert.isDefined(instance.options, 'объект this.options не определено');
        assert.isObject(instance.options, 'объект this.options должно быть объектом');
        assert.deepEqual(instance.options, params, 'объект this.options не эквивалентен объекту с параметрами');
      });

    });

    describe('Приватный метод _initLayoutProperty()', () => {
      let instance = {};

      beforeEach(() => {
        instance = {};
      });

      it('возвращает HTML-элемент', () => {
        instance.$layout = $();
        const resultWithTemp = Layout.prototype._initLayoutProperty.call(instance);

        instance.$layout = $(layoutWithEntry());
        const resultWithoutTemp = Layout.prototype._initLayoutProperty.call(instance);

        assert.instanceOf(resultWithTemp, HTMLElement, 'возвращенное значене не является HTML-элементом');
        assert.instanceOf(resultWithoutTemp, HTMLElement, 'возвращенное значене не является HTML-элементом');
      });

      it('возвращает скомпилированный HTML из функции-шаблона, если свойство Layout.prototype.layout определено', () => {
        instance.$layout = $(layoutWithEntry());
        const result = Layout.prototype._initLayoutProperty.call(instance);

        assert.equal(
          result,
          instance.$layout.get(0),
          'возвращенный HTML-элемент отличается от заданного в функции-шаблоне'
        );
      });

      it('возвращает пустой DIV элемент с атрибутом data-entry, если свойство Layout.prototype.layout неопределено', () => {
        instance.$layout = $();
        const result = Layout.prototype._initLayoutProperty.call(instance);

        assert.equal(result.tagName.toUpperCase(), 'DIV', 'возвращенный HTML-элемент не является DIV-объектом');
        assert.equal(result.innerHTML, '', 'возвращенный HTML-элемент не пустой');
        assert.isTrue(result.hasAttribute('data-entry'), 'возвращенный HTML-элемент не имеет атрибута data-entry');
        assert.match(result.dataset.entry, /^entry/, 'значение атрибута data-entry не начинается с префикса "entry"');
      });
    });

    describe('Приватный метод _initEntryPoints()', () => {

      let instance = {};

      beforeEach(() => {
        instance = {};
      });

      it('возвращает пустой объект, если не указаны точки вставки в функции-шаблоне', () => {
        instance.$layout = $(layoutWithoutEntry());

        const result = Layout.prototype._initEntryPoints.call(instance);

        assert.isObject(result, 'возвращенное значение не является объектом');
        assert.isTrue($.isEmptyObject(result), 'возвращенное значение не пустой объект');
      });

      it('возвращает объект с количеством "ключей" равным количеству точек встаки', () => {
        instance.$layout = $(layoutMixinEntry());

        const result = Layout.prototype._initEntryPoints.call(instance);

        assert.isObject(result, 'возвращенное значение не является объектом');
        assert.lengthOf(Object.keys(result), 2, 'количество "ключей" объекта не равно двум');
      });

      it('"ключи" объекта соответствуют именам точек вставки, указанных в функции-шаблоне', () => {
        instance.$layout = $(layoutWithEntry());
        const names = [];

        instance.$layout.find('[data-entry]').each(function () {
          names.push($(this).data('entry'));
        });

        const result = Layout.prototype._initEntryPoints.call(instance);

        assert.sameMembers(Object.keys(result), names, 'количество "ключей" объекта не равно двум');
      });

      it('значения "ключей" объекта соответствуют jQuery-объектам', () => {
        instance.$layout = $(layoutWithEntry());

        const result = Layout.prototype._initEntryPoints.call(instance);

        assert.isTrue(result.first.is('[data-entry]'), 'количество "ключей" объекта не равно двум');
        assert.deepEqual(
          result.first[0],
          instance.$layout.find('[data-entry="first"]')[0],
          'Кэшированный элемент не соответствует элементу на станице'
        );
      });


      it('если в функции-шаблоне не указаны имена точек ставки, то генерируются уникальные имена', () => {

        for (let i = 0; i < 20; i++) {
          instance.$layout = $(layoutMixinEntry());
          const result = Layout.prototype._initEntryPoints.call(instance);
          const names = Object.keys(result);

          assert.notEqual(names[0], names[1], 'не уникальное имя "ключа"');
          assert.deepEqual(
            result[names[0]][0],
            instance.$layout.find(`[data-entry="${names[0]}"]`)[0],
            'Кэшированный элемент не соответствует элементу на станице'
          );
        }
      });

    });

    describe('Публичный метод getEntryNames()', () => {

      it('возвращает массив с именами точек вставки', () => {
        const ExtendLayout = Layout.extend({
          layout: layoutWithEntry
        });

        const instance = new ExtendLayout();
        const result = instance.getEntryNames();

        assert.isArray(result, 'возвращаемое значение не массив');
        assert.sameMembers(
          result,
          ['first', 'second', 'third'],
          'значения в массиве не соответствуют именам точек вставки'
        );
      });

      it('возвращает пустой массив, если не определена ни одна точка вставки', () => {
        const ExtendLayout = Layout.extend({
          layout: layoutWithoutEntry
        });

        const instance = new ExtendLayout();
        const result = instance.getEntryNames();

        assert.isArray(result, 'возвращаемое значение не массив');
        assert.lengthOf(result, 0, 'массив не пустой');
      });

    });

  });

}
