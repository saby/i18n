/* global define, describe, context, beforeEach, afterEach, it, assert */
define(['I18n/_i18n/Locale', 'I18n/locales/en-US', 'I18n/_i18n/RkString'], function(Locale, config, RkString) {
   describe('Locale', function() {
      describe('rk',function() {
         var i18n = new Locale.default(config.default);
         Locale.default.setDictionary({
            'Английский': 'English',
            'TEST@@Русский': 'Russian',
            'plural#Язык': 'language|languages',
            'TEST@@plural#Ступня': 'foot|foots'
         }, 'TEST/Dictionary', 'en-US');


         it('empty translate' , function() {
            assert.equal(i18n.rk('Английский'), 'English');
         });

         it('context translate' , function() {
            assert.equal(i18n.rk('Русский', 'TEST'), 'Russian');
            assert.equal(i18n.rk('Русский'), 'Русский');
         });

         it('plural translate' , function() {
            assert.equal(i18n.rk('Язык', 1), 'language');
            assert.equal(i18n.rk('Язык', 2), 'languages');
         });

         it('plural and context translate' , function() {
            assert.equal(i18n.rk('Ступня', 'TEST', 1), 'foot');
            assert.equal(i18n.rk('Ступня', 'TEST', 2), 'foots');
            assert.equal(i18n.rk('Ступня',  2), 'Ступня');
            assert.equal(i18n.rk('Ступня',  'TEST'), 'Ступня');
         });

         it('not translate', function() {
            assert.equal(i18n.rk(1), 1);
         });
      });

      it('setDictionary',function() {
         Locale.default.setDictionary({
            'Словарь': 'Dictionary'
         }, 'TEST/setDictionaryTest', 'en-US');


         assert.equal(Locale.default.hasDictionary('TEST/setDictionaryTest', 'en-US'), true);
      });

      it('hasDictionary',function() {
         Locale.default.setDictionary({
            'Словарь': 'Dictionary'
         }, 'TEST/hasDictionary', 'en-US');


         assert.equal(Locale.default.hasDictionary('TEST/hasDictionary', 'en-US'), true);
         assert.equal(Locale.default.hasDictionary('TEST/hotHasDictionary', 'en-US'), false);
      });
   });
});
