/* global define, describe, context, beforeEach, afterEach, it, assert */
define(['I18n/_i18n/Locale', 'I18n/locales/en-US', 'I18n/_i18n/RkString'], function(Locale, config, RkString) {

   describe('RkString', function() {
      it('RkString', function() {
         var i18n = new Locale.default(config.default);

         Locale.default.setDictionary({
            'Английский': 'English',
         }, 'TEST/Dictionary', 'en-US');

         var rkString = new RkString.default('Английский', (function () { return i18n._translate('Английский');}));

         assert.equal(rkString.valueOf(), 'English');
         assert.equal(rkString.toString(), 'English');
         assert.equal(rkString.toJSON(), 'English');
         assert.equal(rkString.length, 7);
      });
   });
});
