/* global define, describe, context, beforeEach, afterEach, it, assert */

/**
 * Created by ganshinyao on 25.04.2017.
 */
define([
   'Core/i18n',
   'Env/Env'
], function (
   i18n,
   Env
) {
   describe('i18n', function () {
      describe('.rk()', function () {
         context('in browser', function () {
            beforeEach(function () {
               if (!Env.constants.isBrowserPlatform) {
                  this.skip();
               }
            });

            it('should return string without translate', function () {
               assert.equal(i18n.rk('foo'), 'foo');
            });
         });
         context('on server side', function () {
            beforeEach(function () {
               if (Env.constants.isBrowserPlatform) {
                  this.skip();
               }
            });

            it('should return instance of String', function () {
               assert.instanceOf(i18n.rk('foo'), String);
               assert.equal(i18n.rk('foo'), 'foo');
            });

            it('should return instance of String from instance of String', function () {
               var foo = i18n.rk('foo'),
                  bar = i18n.rk(foo);
               assert.instanceOf(bar, String);
               assert.equal(bar, 'foo');
            });
         });

         context('locale ru-Ru plural', function () {
            beforeEach(function () {
               i18n.__getLang = i18n.getLang;
               i18n.getLang = function () {
                  return 'ru-RU';
               };
               i18n._dict = {
                  'ru-RU': {
                     'plural#рубль(-я, -ей)': 'рубль|рубля|рублей|рубля'
                  }
               };
               i18n.setEnable(true);
            });

            afterEach(function () {
               i18n.getLang = i18n.__getLang;
               i18n._dict = {};
               i18n.setEnable(false);
            });

            it('should switch word for 0', function () {
               assert.strictEqual(i18n.rk('рубль(-я, -ей)', 0)+'', 'рублей');
            });
            it('should switch word for 10', function () {
               assert.strictEqual(i18n.rk('рубль(-я, -ей)', 10)+'', 'рублей');
            });
            it('should switch word for 1', function () {
               assert.strictEqual(i18n.rk('рубль(-я, -ей)', 1)+'', 'рубль');
            });
            it('should switch word for 11', function () {
               assert.strictEqual(i18n.rk('рубль(-я, -ей)',11)+'', 'рублей');
            });
            it('should switch word for 2', function () {
               assert.strictEqual(i18n.rk('рубль(-я, -ей)',2)+'', 'рубля');
            });
            it('should switch word for 23', function () {
               assert.strictEqual(i18n.rk('рубль(-я, -ей)',23)+'', 'рубля');
            });
            it('should switch word for five', function () {
               assert.strictEqual(i18n.rk('рубль(-я, -ей)',5)+'', 'рублей');
            });
            it('should switch word for 25', function () {
               assert.strictEqual(i18n.rk('рубль(-я, -ей)',25)+'', 'рублей');
            });
            it('should return key as is', function () {
               assert.strictEqual(i18n.rk('запись(-и, -ей)',25)+'', 'запись(-и, -ей)');
            });
         });

         context('locale en-US plural', function () {
            beforeEach(function () {
               i18n.__getLang = i18n.getLang;
               i18n.getLang = function () {
                  return 'en-US';
               };
               i18n._dict = {
                  'en-US': {
                     'plural#рубль(-я, -ей)': 'dollar|dollars'
                  }
               };
               i18n.setEnable(true);
            });
            afterEach(function () {
               i18n.getLang = i18n.__getLang;
               i18n._dict = {};
               i18n.setEnable(false);
            });
            it('should switch word for 0', function () {
               assert.strictEqual(i18n.rk('рубль(-я, -ей)', 0)+'', 'dollars');
            });
            it('should switch word for 1', function () {
               assert.strictEqual(i18n.rk('рубль(-я, -ей)',1)+'', 'dollar');
            });
            it('should switch word for 2', function () {
               assert.strictEqual(i18n.rk('рубль(-я, -ей)',2)+'', 'dollars');
            });
         });

         context('without locale', function () {
            it('should return as is', function () {
               assert.strictEqual(i18n.rk('рубль(-я, -ей)', 0)+'', 'рубль(-я, -ей)');
            });
         });

         context('with locale', function () {
            beforeEach(function () {
               i18n.__getLang = i18n.getLang;
               i18n.getLang = function () {
                  return 'en-US'
               };
               i18n._dict = {
                  'en-US': {
                     'рубль': 'dollar'
                  }
               };
               i18n.setEnable(true);
            });
            it('should translate key', function () {
               assert.strictEqual(i18n.rk('рубль')+'', 'dollar');
            });
            it('should treturn key as is', function () {
               assert.strictEqual(i18n.rk('рубли')+'', 'рубли');
            });
         });

         context('cache', function () {
            beforeEach(function () {
               i18n.__getLang = i18n.getLang;
               i18n.getLang = function () {
                  return 'en-US'
               };
               i18n._dict = {
                  'en-US': {
                     'рубль': 'dollar'
                  }
               };
               i18n.setEnable(true);
            });
            it('should translate key', function () {
               if (typeof window === 'undefined') {
                  //Запускаем тест только под нодой
                  var toCache = i18n.rk('рубль');
                  assert.strictEqual(''+toCache, 'dollar');
                  i18n.getLang = function () {
                     return 'ru-RU';
                  };
                  assert.strictEqual(''+toCache, 'рубль');
                  assert.strictEqual(toCache.toJSON(), 'рубль');
               }
            });
            it('rk not string', function () {
               var objForRk = {myObj: '1'};
               objForRk = i18n.rk(objForRk);
               assert.strictEqual(objForRk.myObj, '1');
            });
         });
      });

      describe('.getDictPath()', function () {
         var dictPath = 'Foo/lang/en-US/en-US.json';

         beforeEach(function () {
            Env.constants.jsModules.Foo = '/resources/Foo/Foo.module.js';
            Env.constants.dictionary['Foo.en-US.json'] = true;
         });

         afterEach(function () {
            delete Env.constants.jsModules.Foo;
            delete Env.constants.dictionary['Foo.en-US.json'];
         });

         it('should return dictionary for module', function () {
            var path = i18n.getDictPath('Foo', 'en-US', 'json');
            assert.strictEqual(path.substr(-dictPath.length), dictPath);
         });

         it('should return dictionary for path relative to module', function () {
            var path = i18n.getDictPath('Foo/bar', 'en-US', 'json');
            assert.strictEqual(path.substr(-dictPath.length), dictPath);
         });
      });
   });
});
