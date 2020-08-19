import Translator from 'I18n/_i18n/Translator';
import Controller from 'I18n/_i18n/Controller';
import Loader from 'I18n/_i18n/Loader';
import {constants, cookie} from 'Env/Env';
import {assert} from 'chai';
import * as sinon from 'sinon';

describe('Controller', () => {
    it('isEnabled return false', () => {
        const controller = new Controller({
            defaultLocale: 'en-US'
        });

        assert.isFalse(controller.isEnabled);
    });

    it('isEnabled return true', () => {
        const controller = new Controller({
            availableLocales: ['en-GB', 'en-US', 'ru-RU'],
            defaultLocale: 'en-GB'
        });

        assert.isTrue(controller.isEnabled);
    });

    it('defaultLang should return en', () => {
        const controller = new Controller({
            availableLocales: ['en-GB', 'en-US', 'ru-RU'],
            defaultLocale: 'en-GB'
        });

        assert.equal(controller.defaultLang, 'en');
    });

    it('getAcceptLanguage', () => {
        assert.deepEqual(Controller.getAcceptLanguage(
            {
                headers: {
                    'accept-language': 'en-US,en;q=0.9,ru;q=0.8'
                }
            }),
            ['en-US', 'en;q=0.9', 'ru;q=0.8']);
    });

    describe('isLangCode', () => {
        it('should return true', () => {
            assert.isTrue(Controller.isLangCode('en'));
        });

        it('should return false', () => {
            assert.isFalse(Controller.isLangCode('en-US'));
        });
    });

    describe('isLocaleCode', () => {
        it('should return true', () => {
            assert.isTrue(Controller.isLocaleCode('en-US'));
        });

        it('should return false', () => {
            assert.isFalse(Controller.isLocaleCode('en'));
        });
    });

    describe('requiredLocales', () => {
        let stubIsServerSide;
        let stubCurrentLocale;
        let controller;

        beforeEach(() => {
            controller = new Controller({
                availableLocales: ['en-GB', 'en-US', 'ru-RU'],
                defaultLocale: 'en-GB'
            });
            stubIsServerSide = sinon.stub(constants, 'isServerSide');
            stubCurrentLocale = sinon.stub(controller, 'currentLocale');

            stubCurrentLocale.get(() => 'en-US');
            stubIsServerSide.get(() => true);
        });

        afterEach(() => {
            stubIsServerSide.restore();
            stubCurrentLocale.restore();

            stubIsServerSide = undefined;
            stubCurrentLocale = undefined;
            controller = undefined;
        });

        it('on client side should return array with alone current locale', () => {
            stubIsServerSide.get(() => false);

            assert.deepEqual(controller.requiredLocales, ['en-US']);
        });

        it('on server side should return array with all locales', () => {
            assert.deepEqual(controller.requiredLocales, ['en-GB', 'en-US', 'ru-RU']);
        });
    });

    describe('currentLocale', () => {
        let stubCookie;
        let stubIsBrowser;
        let stubIsServerSide;
        let controller;

        beforeEach(() => {
            controller = new Controller({
                availableLocales: ['en-GB', 'en-US', 'ru-RU'],
                defaultLocale: 'en-GB'
            });

            stubCookie = sinon.stub(cookie, 'get');
            stubIsBrowser = sinon.stub(constants, 'isBrowserPlatform');
            stubIsServerSide = sinon.stub(constants, 'isServerSide');

            stubCookie.returns('en-US');
            stubIsBrowser.get(() => true);
            stubIsServerSide.get(() => false);
        });

        afterEach(() => {
            stubCookie.restore();
            stubIsBrowser.restore();
            stubIsServerSide.restore();

            controller = undefined;
            stubCookie = undefined;
            stubIsBrowser = undefined;
            stubIsServerSide = undefined;
        });

        it('if one locale is available controller should return it', () => {
            const RuController = new Controller({
                availableLocales: ['ru-RU'],
                defaultLocale: 'ru-RU'
            });

            assert.strictEqual(RuController.currentLocale, 'ru-RU');
        });

        it('if localization is disabled should return default locale', () => {
            const emptyController = new Controller({
                availableLocales: [],
                defaultLocale: 'en-US'
            });

            assert.strictEqual(emptyController.currentLocale, 'en-US');
            assert.strictEqual(emptyController.currentLang, 'en');
        });

        describe('on client side', () => {
            it('should always return first read value from cookie', () => {
                assert.equal(controller.currentLocale, 'en-US');

                stubCookie.returns('ru-RU');

                assert.equal(controller.currentLocale, 'en-US');
            });

            it('should return default language if cookies have not lang value', () => {
                stubCookie.returns(null);

                assert.equal(controller.currentLocale, 'en-GB');
            });
        });

        describe('on server side', () => {
            it('should always return actual value from cookies if it exists', () => {
                stubIsBrowser.get(() => false);

                assert.equal(controller.currentLocale, 'en-US');

                stubCookie.returns('ru-RU');

                assert.equal(controller.currentLocale, 'ru-RU');
            });

            it('should detect language from accept-language if cookies have not lang value', () => {
                stubIsBrowser.get(() => false);
                stubCookie.returns(null);

                const stubSetCookie = sinon.stub(cookie, 'set');
                stubSetCookie.returns(null);

                const stubAcceptLang = sinon.stub(Controller, 'getAcceptLanguage');

                stubAcceptLang.returns(['en-US', 'en;q=0.9', 'ru;q=0.8']);

                assert.equal(controller.currentLocale, 'en-US');

                stubAcceptLang.returns(['en', 'en-US;q=0.9', 'ru;q=0.8']);

                assert.equal(controller.currentLocale, 'en-GB');

                stubSetCookie.restore();
                stubAcceptLang.restore();
            });
        });
    });

    describe('getTranslator', () => {
        let controller;
        let stubContextLoader;

        beforeEach(() => {
            controller = new Controller({
                availableLocales: ['en-GB', 'en-US', 'ru-RU'],
                defaultLocale: 'en-GB'
            });

            stubContextLoader = sinon.stub(Loader.prototype, 'context');
            stubContextLoader.returns(Promise.resolve({
                'en-US': {
                    Язык: 'Language'
                }
            }));
        });

        afterEach(() => {
            stubContextLoader.restore();

            stubContextLoader = undefined;
            controller = undefined;
        });

        it('should return instance of Translator', () => {
            return controller.getTranslator('contextName').then((translator) => {
                assert.instanceOf(translator, Translator);
            }).catch((err) => {
                assert.fail(err.message);
            });
        });

        it('if function be called for the same context should return the same instance', () => {
            return controller.getTranslator('contextName').then((firstTranslator) => {
                controller.getTranslator('contextName').then((translator) => {
                    assert.equal(translator, firstTranslator);
                }).catch((err) => {
                    assert.fail(err.message);
                });
            }).catch((err) => {
                assert.fail(err.message);
            });
        });

        describe('if synchronous mode is enabled', () => {
            let stubSetDict;

            before(() => {
                stubSetDict = sinon.stub(Translator.prototype, 'setDictionaries');
            });

            after(() => {
                stubSetDict.restore();
                stubSetDict = undefined;
            });

            it('should return instance Translator and when context was loaded added it in instance', (done) => {
                stubSetDict.callsFake((context) => {
                    assert.deepEqual(context, {
                        'en-US': {
                            Язык: 'Language'
                        }
                    });

                    done();
                });

                assert.instanceOf(controller.getTranslator('context', true), Translator);
            });
        });
    });

    describe('isSupportLocale', () => {
        const controller = new Controller({
            availableLocales: ['en-GB', 'en-US', 'ru-RU'],
            defaultLocale: 'en-GB'
        });

        it ('should return true from "en-US"', () => {
            assert.isTrue(controller.isSupportedLocale('en-US'));
        });

        it ('should return true from "en"', () => {
            assert.isTrue(controller.isSupportedLocale('en'));
        });

        it ('should return false from "fr"', () => {
            assert.isFalse(controller.isSupportedLocale('fr'));
        });
    });
});
