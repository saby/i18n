/* global define, describe, context, beforeEach, afterEach, it, assert */

define(['I18n/_i18n/Locale', 'I18n/locales/en-US', 'I18n/_i18n/RkString', 'Env/Constants'], function(Locale, config, RkString, Constants) {
   const constants = Constants.constants;
   describe('Locale', function() {
      ['browser', 'node'].forEach(function (env) {
         describe(env, function() {
            let stub;
            beforeEach(function () {
               stub = sinon.stub(constants, 'isBrowserPlatform').get(function() {
                  return env === 'browser';
               });
            });
            afterEach(function () {
               stub.restore();
            });
            describe('rk', function () {
               var i18n = new Locale.default(config.default);
               Locale.default.setDictionary({
                  'Английский': 'English',
                  'TEST@@Русский': 'Russian',
                  'plural#язык': 'language|languages',
                  'plural#Пустота': 'Empty',
                  'TEST@@plural#ступня': 'foot|foots',
                  'у': ''
               }, 'TEST/Dictionary', 'en-US');


               it('empty translate', function () {
                  assert.equal(i18n.rk('Английский'), 'English');
               });

               it('word translated to an empty string', function () {
                  assert.equal(i18n.rk('у'), '');
               });

               it('context translate', function () {
                  assert.equal(i18n.rk('Русский', 'TEST'), 'Russian');
                  assert.equal(i18n.rk('Русский'), 'Русский');
               });

               it('not have plural form', function () {
                  assert.equal(i18n.rk('Пустота', 1), 'Empty');
                  assert.equal(i18n.rk('Пустота', 2), 'Пустота');
               });

               it('plural translate', function () {
                  assert.equal(i18n.rk('язык', 1), 'language');
                  assert.equal(i18n.rk('язык', 2), 'languages');
               });

               it('plural and context translate', function () {
                  assert.equal(i18n.rk('ступня', 'TEST', 1), 'foot');
                  assert.equal(i18n.rk('ступня', 'TEST', 2), 'foots');
                  assert.equal(i18n.rk('ступня', 2), 'ступня');
                  assert.equal(i18n.rk('ступня', 'TEST'), 'ступня');
               });

               it('not translate', function () {
                  assert.equal(i18n.rk(1), 1);
               });
            });

            it('setDictionary', function () {
               Locale.default.setDictionary({
                  'Словарь': 'Dictionary'
               }, 'TEST/setDictionaryTest', 'en-US');


               assert.equal(Locale.default.hasDictionary('TEST/setDictionaryTest', 'en-US'), true);
            });

            it('hasDictionary', function () {
               Locale.default.setDictionary({
                  'Словарь': 'Dictionary'
               }, 'TEST/hasDictionary', 'en-US');


               assert.equal(Locale.default.hasDictionary('TEST/hasDictionary', 'en-US'), true);
               assert.equal(Locale.default.hasDictionary('TEST/hotHasDictionary', 'en-US'), false);
            });
         });
      });
   });
});
