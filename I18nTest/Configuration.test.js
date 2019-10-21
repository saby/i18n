/* global define, describe, context, beforeEach, afterEach, it, assert */

define(['I18n/_i18n/Configuration', 'Env/Env'], function(Configuration, env) {
   describe('Configuration', function() {

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
         assert.equal(Configuration.default.load(), 'ru-RU');
      });

      it('isSet', function() {
         assert.equal(Configuration.default.isSet(), true);

         stub.returns(null);
         assert.equal(Configuration.default.isSet(), false);
      });

      it('detect', function() {
         assert.equal(Configuration.default.detect(request, {'en-US': 'FFF', 'ru-RU': 'hhh'}), 'en-US');
         assert.equal(Configuration.default.detect(request, {'ru-RU': 'hhh'}), 'ru-RU');
      });
   });
});
