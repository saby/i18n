/* global define, describe, context, beforeEach, afterEach, it, assert */

define(['I18n/_i18n/Loader'], function(Loader) {
   describe('Loader', function() {
      var loader = function(name, callback, errback) {
        switch (name) {
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

      describe('loadModule', function() {
         it('load', function() {
            Loader.default.loadModule('good', loader).addCallback(function(info) {
               assert.equal(info['en-US'], true);
               assert.equal(info['ru-RU'], true);
               assert.equal(info['ru-RU'].include('json'), true);
               assert.equal(info['en-US'].include('json'), true);
               assert.equal(info['en-US'].include('css'), true);
            });
         });

         it('second call', function() {
            Loader.default.loadModule('good', loader).addCallback(function(info) {
               assert.equal(info['en-US'], true);
               assert.equal(info['ru-RU'], true);
               assert.equal(info['ru-RU'].include('json'), true);
               assert.equal(info['en-US'].include('json'), true);
               assert.equal(info['en-US'].include('css'), true);
            });
         });

         it('error', function() {
            Loader.default.loadModule('bed', loader).addErrback(function(err) {
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
