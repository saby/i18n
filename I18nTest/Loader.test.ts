import {assert} from 'chai';
import * as sinon from 'sinon';
import Loader from 'I18n/_i18n/Loader';
import enUS from 'I18nTest/testConfig/en-US';
import enRU from 'I18nTest/testConfig/en-RU';
import {constants} from 'Env/Env';

describe('Loader', () => {
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
