import Translator from 'I18n/_i18n/Translator';
import Controller from 'I18n/_i18n/Controller';
import Loader from 'I18n/_i18n/Loader';
import { constants, cookie } from 'Env/Env';
import { location } from 'Application/Env';
import * as conduct from 'RequireJsLoader/conduct';

let controller;

describe('Controller', () => {
    test('isEnabled return false', () => {
        const controller = new Controller({
            defaultLocale: 'en-US',
        });

        expect(controller.isEnabled).toBeFalsy();
    });

    test('isEnabled return true', () => {
        const controller = new Controller({
            availableLocales: ['en-GB', 'en-US', 'ru-RU'],
            defaultLocale: 'en-GB',
        });

        expect(controller.isEnabled).toBeTruthy();
    });

    test('defaultLang should return en', () => {
        const controller = new Controller({
            availableLocales: ['en-GB', 'en-US', 'ru-RU'],
            defaultLocale: 'en-GB',
        });

        expect(controller.defaultLang).toStrictEqual('en');
    });

    test('getAcceptLanguage', () => {
        const acceptLangeage = Controller.getAcceptLanguage({
            headers: {
                'accept-language': 'en-US,en;q=0.9,ru;q=0.8',
            },
        });

        expect(acceptLangeage).toEqual(['en-US', 'en;q=0.9', 'ru;q=0.8']);
    });

    describe('isLangCode', () => {
        test('should return true', () => {
            expect(Controller.isLangCode('en')).toBeTruthy();
        });

        test('should return false', () => {
            expect(Controller.isLangCode('en-US')).toBeFalsy();
        });
    });

    describe('isLocaleCode', () => {
        test('should return true if is locale code', () => {
            expect(Controller.isLocaleCode('en-US')).toBeTruthy();
        });

        test('should return false if it is lang code', () => {
            expect(Controller.isLocaleCode('en')).toBeFalsy();
        });
    });

    describe('requiredLocales', () => {
        const originalIsServerSide = constants.isServerSide;
        let stubCurrentLocale;

        beforeEach(() => {
            controller = new Controller({
                availableLocales: ['en-GB', 'en-US', 'ru-RU'],
                defaultLocale: 'en-GB',
            });

            constants.isServerSide = true;
            stubCurrentLocale = jest
                .spyOn(controller, 'currentLocale', 'get')
                .mockReturnValue('en-US');
        });

        afterEach(() => {
            constants.isServerSide = originalIsServerSide;
            stubCurrentLocale.mockRestore();
        });

        test('on client side should return array with alone current locale', () => {
            constants.isServerSide = false;

            expect(controller.requiredLocales).toEqual(['en-US']);
        });

        test('on server side should return array with all locales', () => {
            expect(controller.requiredLocales).toEqual(['en-GB', 'en-US', 'ru-RU']);
        });
    });

    describe('currentCountry', () => {
        const originalIsBrowser = constants.isBrowserPlatform;
        let stubLocation;
        let stubCookie;

        beforeEach(() => {
            stubCookie = jest.spyOn(cookie, 'get').mockReturnValue(null);
            stubLocation = jest.spyOn(location, 'hostname', 'get').mockReturnValue('test.sbis.ru');
            constants.isBrowserPlatform = false;

            controller = new Controller({
                availableLocales: ['en-GB', 'en-US', 'ru-RU'],
                defaultLocale: 'en-US',
            });
        });

        afterEach(() => {
            constants.isBrowserPlatform = originalIsBrowser;

            stubLocation.mockRestore();
            stubCookie.mockRestore();
        });

        test('should return RU if domain and cookie "region" not exists', () => {
            stubLocation.mockReturnValue('');

            expect(controller.currentCountry).toStrictEqual('RU');
        });

        test('should return RU if first level domain is .ru', () => {
            expect(controller.currentCountry).toStrictEqual('RU');
        });

        test('should return KZ if cookie "region" is equal KZ', () => {
            stubCookie.mockReturnValue('KZ');

            expect(controller.currentCountry).toStrictEqual('KZ');
        });

        test('should return KZ if first level domain is .kz', () => {
            stubLocation.mockReturnValue('test.sbis.kz');

            expect(controller.currentCountry).toStrictEqual('KZ');
        });
    });

    describe('currentLocale', () => {
        const originalIsBrowser = constants.isBrowserPlatform;
        const originIsServerSide = constants.isServerSide;
        let stubCookie;
        let stubSetCookie;
        let stubAcceptLang;

        beforeEach(() => {
            stubCookie = jest.spyOn(cookie, 'get').mockReturnValue('en-US');
            stubSetCookie = jest.spyOn(cookie, 'set').mockReturnValue(null);
            constants.isBrowserPlatform = true;
            constants.isServerSide = false;
            stubAcceptLang = jest
                .spyOn(Controller, 'getAcceptLanguage')
                .mockReturnValue(['en-US', 'en;q=0.9', 'ru;q=0.8']);

            controller = new Controller({
                availableLocales: ['en-GB', 'en-US', 'ru-RU', 'ru-KZ'],
                defaultLocale: 'en-US',
            });
        });

        afterEach(() => {
            constants.isBrowserPlatform = originalIsBrowser;
            constants.isServerSide = originIsServerSide;
            stubCookie.mockRestore();
            stubSetCookie.mockRestore();
            stubAcceptLang.mockRestore();
        });

        test('if one locale is available controller should return it', () => {
            const RuController = new Controller({
                availableLocales: ['ru-RU'],
                defaultLocale: 'ru-RU',
            });

            expect(RuController.currentLocale).toStrictEqual('ru-RU');
            expect(RuController.currentLang).toStrictEqual('ru');
        });

        test('if localization is disabled should return default locale', () => {
            const emptyController = new Controller({
                availableLocales: [],
                defaultLocale: 'en-US',
            });

            expect(emptyController.currentLocale).toStrictEqual('en-US');
            expect(emptyController.currentLang).toStrictEqual('en');
        });

        describe('on client side', () => {
            test('should always return first read value from cookie', () => {
                expect(controller.currentLocale).toStrictEqual('en-US');

                stubCookie.mockReturnValue('ru-RU');

                expect(controller.currentLocale).toStrictEqual('en-US');
            });

            test('should return default language if cookies have not lang value', () => {
                stubCookie.mockReturnValue(null);

                expect(controller.currentLocale).toStrictEqual('en-US');
            });
        });

        describe('on server side', () => {
            test('should always return actual value from cookies if it exists', () => {
                constants.isBrowserPlatform = false;

                expect(controller.currentLocale).toStrictEqual('en-US');

                stubCookie.mockReturnValue('ru-RU');

                expect(controller.currentLocale).toStrictEqual('ru-RU');
            });

            describe('cookie lang not exists', () => {
                test('should detect locale from accept-language', () => {
                    constants.isBrowserPlatform = false;

                    stubCookie.mockReturnValue(null);
                    stubAcceptLang.mockReturnValue(['en-GB', 'en-US;q=0.9', 'ru;q=0.8']);

                    expect(controller.currentLocale).toStrictEqual('en-GB');
                });

                test('should detect full locale by region and lang code from accept-language', () => {
                    constants.isBrowserPlatform = false;

                    stubCookie.mockImplementation((name) => {
                        if (name === 'lang') {
                            return null;
                        }

                        if (name === 'region') {
                            return 'KZ';
                        }
                    });

                    stubAcceptLang.mockReturnValue(['ru', 'en-US;q=0.9']);

                    expect(controller.currentLocale).toStrictEqual('ru-KZ');
                });
            });
        });
    });

    describe('getTranslator', () => {
        let controller;
        let stubContextLoader;

        beforeEach(() => {
            controller = new Controller({
                availableLocales: ['en-GB', 'en-US', 'ru-RU'],
                defaultLocale: 'en-GB',
            });

            stubContextLoader = jest.spyOn(Loader.prototype, 'context');
            stubContextLoader.mockReturnValue(
                Promise.resolve({
                    'en-US': {
                        Язык: 'Language',
                    },
                })
            );
        });

        afterEach(() => {
            stubContextLoader.mockRestore();
        });

        test('should return instance of Translator', () => {
            return controller.getTranslator('contextName').then((translator) => {
                expect(translator).toBeInstanceOf(Translator);
            });
        });

        test('if function be called for the same context should return the same instance', () => {
            return controller.getTranslator('contextName').then((firstTranslator) => {
                return controller.getTranslator('contextName').then((translator) => {
                    expect(translator).toStrictEqual(firstTranslator);
                });
            });
        });

        describe('if synchronous mode is enabled', () => {
            let stubSetDict;

            beforeEach(() => {
                stubSetDict = jest.spyOn(Translator.prototype, 'setDictionaries');
            });

            afterEach(() => {
                stubSetDict.mockRestore();
            });

            test('should return instance Translator and when context was loaded added it in instance', () => {
                return new Promise((resolve) => {
                    stubSetDict.mockImplementation((context) => {
                        expect(context).toEqual({
                            'en-US': {
                                Язык: 'Language',
                            },
                        });

                        resolve(true);
                    });

                    expect(controller.getTranslator('context', true)).toBeInstanceOf(Translator);
                });
            });
        });
    });

    describe('isSupportLocale', () => {
        const controller = new Controller({
            availableLocales: ['en-GB', 'en-US', 'ru-RU'],
            defaultLocale: 'en-GB',
        });

        test('should return true from "en-US"', () => {
            expect(controller.isSupportedLocale('en-US')).toBeTruthy();
        });

        test('should return true from "en"', () => {
            expect(controller.isSupportedLocale('en')).toBeTruthy();
        });

        test('should return false from "fr"', () => {
            expect(controller.isSupportedLocale('fr')).toBeFalsy();
        });
    });

    describe('getImageUrl', () => {
        let stubGetResourceUrl;
        let stubGetModuleUrl;

        beforeEach(() => {
            controller = new Controller({
                availableLocales: ['en-GB', 'en-US', 'ru-RU'],
                defaultLocale: 'en-GB',
            });

            stubGetResourceUrl = jest
                .spyOn(conduct, 'getResourceUrl')
                .mockImplementation((value) => {
                    return value;
                });
            stubGetModuleUrl = jest.spyOn(conduct, 'getModuleUrl').mockImplementation((value) => {
                return value;
            });
        });

        afterEach(() => {
            stubGetResourceUrl.mockRestore();
            stubGetModuleUrl.mockRestore();
        });

        test('should return url from cdn resource if pass parameter "version"', () => {
            expect(
                controller.getImageUrl('ModuleName', 'path/nameImage.png', '1.0.1')
            ).toStrictEqual('/cdn/ModuleName/1.0.1/lang/en/images/path/nameImage.png');
        });

        test('should return url from main resource', () => {
            expect(controller.getImageUrl('ModuleName', 'path/nameImage.png')).toStrictEqual(
                'ModuleName/lang/en/images/path/nameImage.png'
            );
        });
    });
});
