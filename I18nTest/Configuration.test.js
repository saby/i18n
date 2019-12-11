/* global define, describe, context, beforeEach, afterEach, it, assert */

define(['I18n/_i18n/Configuration', 'Env/Env'], function(Configuration, env) {
   describe('Configuration', function() {

      var getRequest = function(acceptLanguage) {
         return {
            headers: {
               'accept-language': acceptLanguage
            }
         }
      }
      var request = {
         headers: {
            'accept-language': 'en-US,en;q=0.9,ru;q=0.8,ru-RU;q=0.7'
         }
      };

      var stub;

      beforeEach(function() {
         stub = sinon.stub(env.cookie, 'get');
         stub.returns('en-US');
      });

      afterEach(function() {
         stub.restore();
         stub = undefined;
      });

      it('load', function() {
         assert.equal(Configuration.default.load(), 'en-US');

         stub.returns(null);
         assert.equal(Configuration.default.load(), '');

         stub.returns('en');
         assert.equal(Configuration.default.load(), 'en-US');
      });

      it('isSet', function() {
         assert.equal(Configuration.default.isSet(), true);

         stub.returns(null);
         assert.equal(Configuration.default.isSet(), false);
      });

      describe('detect', function() {
         var fullAvailableLang = {
            'en-US': 'FFF',
            'en-GB': 'FFF',
            'ru-RU': 'hhh',
            'en': 'FFF',
            'ru': 'hhh'
         };
         var AvailableLangRU = {
            'ru-RU': 'hhh',
            'ru': 'hhh'
         };

         it('accept-language do have a priority locale', function() {
            var request = getRequest('en-US,en;q=0.9,ru;q=0.8,ru-RU;q=0.7');

            assert.equal(Configuration.default.detect(request, fullAvailableLang), 'en-US');
            assert.equal(Configuration.default.detect(request, AvailableLangRU), 'ru-RU');
         });

         it('accept-language do have a priority lang', function() {
            var request = getRequest('en,ru;q=0.9,en-US;q=0.8,ru-RU;q=0.7');

            assert.equal(Configuration.default.detect(request, fullAvailableLang), 'en-US');
            assert.equal(Configuration.default.detect(request, AvailableLangRU), 'ru-RU');
         });

         it('accept-language do not have available language', function() {
            var request = getRequest('fr,fr-FR;q=0.9');

            assert.equal(Configuration.default.detect(request, fullAvailableLang), '');
         });
      });
   });
});
