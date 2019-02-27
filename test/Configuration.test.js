/* global define, describe, context, beforeEach, afterEach, it, assert */

define(['I18n/_i18n/Configuration'], function(Configuration) {
   describe('Configuration', function() {

      process = process || {};
      process.domain = process.domain || {};
      process.domain.req = process.domain.req || {};
      process.domain.req.cookies = process.domain.req.cookies || {};
      const cookies = process.domain.req.cookies || {};

      const request = {
         query: {
            lang: 'en-US'
         },
         headers: {
            'accept-language': 'en-US,en;q=0.9,ru;q=0.8,ru-RU;q=0.7'
         }
      };

      it('load', function() {
         assert.equal(Configuration.default.load(request), 'en-US');
         assert.equal(Configuration.default.load({}), null);

         cookies.lang = 'ru-RU';
         assert.equal(Configuration.default.load({}), 'ru-RU');
      });

      it('isSet', function() {
         cookies.lang = null;
         assert.equal(Configuration.default.isSet(request), true);
         assert.equal(Configuration.default.isSet({}), false);

         cookies.lang = 'ru-RU';
         assert.equal(Configuration.default.isSet(), true);
      });

      it('validate', function() {
         cookies.lang = 'en-US';
         assert.equal(Configuration.default.validate(request), true);

         cookies.lang = 'ru-RU';
         assert.equal(Configuration.default.validate(request), false);

         cookies.lang = null;
         assert.equal(Configuration.default.validate(request), false);
      });

      it('detect', function() {
         assert.equal(Configuration.default.detect(request, {'en-US': 'FFF', 'ru-RU': 'hhh'}), 'en-US');
         assert.equal(Configuration.default.detect(request, {'ru-RU': 'hhh'}), 'ru-RU');
      });
   });
});
