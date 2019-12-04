/* global define, describe, context, beforeEach, afterEach, it, assert */

define(['I18n/_i18n/Loader', 'I18nTest/testConfig/en-US', 'I18nTest/testConfig/en-RU'], function(Loader, enUS, enRU) {
   describe('Loader', function() {
      const loaderInfo = function(name, callback, errback) {
        switch (name[0]) {
           case 'good/.builder/module': {
              callback({
                 dict: [
                    'en-US',
                    'en-US.css',
                    'ru-RU'
                 ]
              });

              break;
           }
           case 'bed/.builder/module': {
              errback('Error');
              break;
           }
        }
      };

      describe('loadConfiguration', function() {
         if (!window) {
            it ('en-US',  function(done) {
               Loader.default.loadConfiguration('en-US').addCallback(function(result) {
                  delete result.plural;
                  assert.deepEqual(result, enUS.default);
                  done();
               })
            });

            it ('en-RU',  function(done) {
               Loader.default.loadConfiguration('en-RU').addCallback(function(result) {
                  delete result.plural;
                  assert.deepEqual(result, enRU.default);
                  done();
               })
            });

            it ('en',  function(done) {
               Loader.default.loadConfiguration('en').addCallback(function(result) {
                  delete result.plural;
                  assert.deepEqual(result, enUS.default);
                  done();
               })
            });

            it ('not support locale',  function(done) {
               Loader.default.loadConfiguration('fr-FR').addCallbacks(function(result) {
                  delete result.plural;
                  assert.deepEqual(result, enUS.default);
                  done();
               }, function(err) {
                  assert.equal(err.message,`Language fr is not supported`);
                  done();
               });
            });
         }
      });

      describe('loadModule', function() {
         it('first load', function () {
            Loader.default.loadModule('good', loaderInfo).addCallback(function(info) {
               assert.deepEqual(info['en-US'], ['json', 'css']);
               assert.deepEqual(info['ru-RU'], ['json']);
            });
         });

         it('second load', function () {
            Loader.default.loadModule('good', loaderInfo).addCallback(function (info) {
               assert.deepEqual(info['en-US'], ['json', 'css']);
               assert.deepEqual(info['ru-RU'], ['json']);
            });
         });

         it('error', function() {
            Loader.default.loadModule('bed', loaderInfo).addErrback(function(err) {
               assert.equal(err, 'Error');
            });
         });

         it('isLoadedModule', function() {
            assert.equal(Loader.default.isLoadedModule('good'), true);
            assert.equal(Loader.default.isLoadedModule('notLoad'), false);
         });
      });
   });
});
