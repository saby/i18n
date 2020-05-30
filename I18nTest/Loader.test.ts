import {assert} from 'chai';
import * as sinon from 'sinon';
import Loader from 'I18n/_i18n/Loader';
import enUS from 'I18nTest/testConfig/en-US';
import enRU from 'I18nTest/testConfig/en-RU';
import {constants} from 'Env/Env';

describe('Loader', () => {
    const dictEn = {
        ключ: 'key'
    };
    const dictRu = {
        ключ: 'ключ'
    };
    const dictionary = {
        en: dictEn,
        'ru-RU': dictRu
    };
    const availableResources = {
        dict: [
            'en',
            'en.css',
            'ru-RU',
            'ru-RU.css'
        ]
    };
    const externalContents = {
        buildnumber: '1234',
        modules: {
            externalContext: availableResources
        }
    };

    const loader = new Loader({
        context: availableResources,
        externalContext: {
            buildnumber: '12345',
            path: '/service/path/externalContext'
        }
    });

    describe('dictionary', () => {
        it('should load base dictionary', () => {
            const fareLoader = (path) => {
                assert.strictEqual(path, 'context/lang/en/en.json');

                return Promise.resolve(dictEn);
            };

            return loader.dictionary('context', 'en', fareLoader).then((dict) => {
                assert.deepEqual(dict, ['en', dictEn]);
            });
        });

        it('should load advanced dictionary', () => {
            const fareLoader = (path) => {
                assert.strictEqual(path, 'context/lang/en/en-US.json');

                return Promise.resolve(dictEn);
            };

            return loader.dictionary('context', 'en-US', fareLoader).then((dict) => {
                assert.deepEqual(dict, ['en-US', dictEn]);
            });
        });
    });

    describe('css', () => {
        it('should load base css', () => {
            const fareLoader = (path) => {
                assert.strictEqual(path, 'native-css!context/lang/en/en');

                return Promise.resolve();
            };

            return loader.css('context', 'en', fareLoader);
        });

        it('should load advanced css', () => {
            const fareLoader = (path) => {
                assert.strictEqual(path, 'native-css!context/lang/en/en-US');

                return Promise.resolve();
            };

            return loader.css('context', 'en-US', fareLoader);
        });
    });

    describe('context', () => {
        let stubLoaderDict;
        let stubLoaderCss;
        let stubContents;

        before(() => {
            stubLoaderDict = sinon.stub(loader, 'dictionary');
            stubLoaderCss = sinon.stub(loader, 'css');
            stubContents = sinon.stub(loader, 'contents');

            stubLoaderDict.callsFake((context, key) => Promise.resolve([key, dictionary[key]]));
            stubLoaderCss.returns(Promise.resolve());
            stubContents.returns(Promise.resolve(externalContents));
        });

        after(() => {
            stubLoaderDict.restore();
            stubLoaderCss.restore();
            stubContents.restore();

            stubLoaderDict = undefined;
            stubLoaderCss = undefined;
            stubContents = undefined;
        });

        it('should return context with russian dictionary', () => {
            return loader.context('context', ['ru-RU']).then((value) => {
                assert.deepEqual(Object.keys(value), ['ru-RU']);
                assert.deepEqual(value['ru-RU'], dictRu);
            });
        });

        it('should return context with all dictionary', () => {
            return loader.context('context', ['ru-RU', 'en-US', 'en-GB']).then((value) => {
                assert.includeMembers(Object.keys(value), ['ru-RU', 'en-US', 'en-GB', 'en']);
                assert.strictEqual(Object.keys(value).length, ['ru-RU', 'en-US', 'en-GB', 'en'].length);

                assert.deepEqual(value['ru-RU'], dictRu);
                assert.deepEqual(value['en-US'], dictEn);
                assert.deepEqual(value['en-GB'], dictEn);
                assert.deepEqual(value.en, dictEn);
            });
        });

        it('should return external context', () => {
            return loader.context('externalContext', ['ru-RU', 'en-US', 'en-GB']).then((value) => {
                assert.includeMembers(Object.keys(value), ['ru-RU', 'en-US', 'en-GB', 'en']);
                assert.strictEqual(Object.keys(value).length, ['ru-RU', 'en-US', 'en-GB', 'en'].length);

                assert.deepEqual(value['ru-RU'], dictRu);
                assert.deepEqual(value['en-US'], dictEn);
                assert.deepEqual(value['en-GB'], dictEn);
                assert.deepEqual(value.en, dictEn);
            });
        });
    });

    describe('contents', () => {
        let stubIsBrowser;

        beforeEach(() => {
            stubIsBrowser = sinon.stub(constants, 'isBrowserPlatform');
            stubIsBrowser.get(() => true);
        });

        afterEach(() => {
            stubIsBrowser.restore();

            stubIsBrowser = undefined;
        });

        it('on client side should use fetch', () => {
            const goodResponse = {
                ok: true,
                json: () => new Promise((resolve) => resolve(externalContents))
            };

            const fakeFetch = (url) => new Promise((resolve) => {
                assert.strictEqual(url, '/service/path/externalContext/contents.json?x_module=12345');
                resolve(goodResponse);
            });

            return loader.contents('externalContext', fakeFetch).then((contents) => {
                assert.deepEqual(contents, externalContents);
            });
        });

        it('on server side should use loader', () => {
            stubIsBrowser.get(() => false);

            const fakeLoader = (url) => new Promise((resolve) => {
                assert.strictEqual(url, 'json!/service/path/externalContext/contents.json');
                resolve(externalContents);
            });

            return loader.contents('externalContext', fakeLoader).then((contents) => {
                assert.deepEqual(contents, externalContents);
            });
        });
    });

    describe('getAvailableDictionary', () => {
        const global = (function() {return this || (0, eval)('this');}());

        const dict = ['en', 'ru'];

        const contents1 = {
            modules: {
                LocalizedModule1: {
                    dict: dict
                },
                LocalizedModule2: {
                    dict: dict
                },
                LocalizedModule3: {
                    dict: dict
                }
            }
        };

        const loader = () => ['en', 'ru'];

        const goodResponse = {
            ok: true,
            json: () => new Promise((resolve) => resolve(contents1))
        };

        const fakeFetch = (url) => new Promise((resolve) => {
            if (url === '/service/contents.json') {
                resolve(goodResponse);
            }
        });

        const originalFetch = global.fetch;
        let stubConstants;

        beforeEach('', () => {
            global.fetch = fakeFetch;
            stubConstants = sinon.stub(constants, 'isBrowserPlatform');
            stubConstants.get(function() {
                return true;
            });
        });

        afterEach('', () => {
            global.fetch = originalFetch;
            stubConstants.restore();
            stubConstants = undefined;
        });

        it ('from contents', (done) => {
            const def = Loader.getAvailableDictionary('LocalizedModule1', contents1);

            def.addCallback((result) => {
                assert.deepEqual(result, ['en', 'ru']);
                done();
            });
        });

        it ('from custom loader', (done) => {
            const def = Loader.getAvailableDictionary('LocalizedModule2', loader);

            def.addCallback((result) => {
                assert.deepEqual(result, ['en', 'ru']);
                done();
            });
        });

        it ('from load by url', (done) => {
            const def = Loader.getAvailableDictionary('LocalizedModule3',  '/service/contents.json');

            def.addCallback((result) => {
                assert.deepEqual(result, ['en', 'ru']);
                done();
            });
        });
    });

    describe('loadConfiguration', () => {
        if (!window) {
            it ('en-US',  (done) => {
                Loader.loadConfiguration('en-US').addCallback((result) => {
                    delete result.plural;
                    assert.deepEqual(result, enUS);
                    done();
                })
            });

            it ('en-RU',  (done) => {
                Loader.loadConfiguration('en-RU').addCallback((result) => {
                    delete result.plural;
                    assert.deepEqual(result, enRU);
                    done();
                })
            });

            it ('en',  (done) => {
                Loader.loadConfiguration('en').addCallback((result) => {
                    delete result.plural;
                    assert.deepEqual(result, enUS);
                    done();
                })
            });

            it ('not support locale',  (done) => {
                Loader.loadConfiguration('fr-FR').addCallbacks((result) => {
                    delete result.plural;
                    assert.deepEqual(result, enUS);
                    done();
                }, (err) => {
                    assert.equal(err.message,`Language fr is not supported`);
                    done();
                });
            });
        }
    });
});
