import Translator from 'I18n/_i18n/Translator';
import Controller from 'I18n/_i18n/Controller';
import Loader from 'I18n/_i18n/Loader';
import constants from 'Env/Constants';
import { location } from 'Application/Env';
import * as conduct from 'RequireJsLoader/conduct';

let controller: Controller;

describe('Controller', () => {
    test('isEnabled return false', () => {
        const controller = new Controller({
            defaultLanguage: 'en',
            availableRegions: ['RU', 'KZ'],
        });

        expect(controller.isEnabled).toBeFalsy();
    });

    test('isEnabled return true', () => {
        const controller = new Controller({
            availableLanguages: ['en', 'ru'],
            defaultLanguage: 'en',
        });

        expect(controller.isEnabled).toBeTruthy();
    });

    test('defaultLang should return en', () => {
        const controller = new Controller({
            availableLanguages: ['en', 'ru'],
            defaultLanguage: 'en',
        });

        expect(controller.defaultLanguage).toStrictEqual('en');
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

    describe('requiredLanguages', () => {
        const originalIsServerSide = constants.isServerSide;

        beforeEach(() => {
            controller = new Controller({
                availableLanguages: ['en', 'ru'],
                defaultLanguage: 'en',
            });

            constants.isServerSide = true;
            jest.spyOn(controller, 'currentLang', 'get').mockReturnValue('en');
        });

        afterEach(() => {
            constants.isServerSide = originalIsServerSide;
        });

        test('on client side should return array with alone current locale', () => {
            constants.isServerSide = false;

            expect(controller.requiredLanguages).toEqual(['en']);
        });

        test('on server side should return array with all languages', () => {
            expect(controller.requiredLanguages).toEqual(['en', 'ru']);
        });
    });

    describe('currentCountry', () => {
        const originalIsBrowser = constants.isBrowserPlatform;
        let stubLocation: jest.SpiedFunction<() => string>;
        let stubCookie: jest.SpiedFunction<(typeof Controller)['getCookie']>;

        beforeEach(() => {
            stubCookie = jest.spyOn(Controller, 'getCookie').mockReturnValue(null);
            stubLocation = jest.spyOn(location, 'hostname', 'get').mockReturnValue('test.sbis.ru');
            constants.isBrowserPlatform = false;

            controller = new Controller({
                availableLanguages: ['en', 'ru'],
                availableRegions: ['RU', 'KZ'],
                defaultLanguage: 'en',
            });
        });

        afterEach(() => {
            constants.isBrowserPlatform = originalIsBrowser;
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
        let stubCookie: jest.SpiedFunction<(typeof Controller)['getCookie']>;
        let stubAcceptLang: jest.SpiedFunction<(typeof Controller)['getAcceptLanguage']>;

        beforeEach(() => {
            stubCookie = jest.spyOn(Controller, 'getCookie').mockImplementation((name) => {
                if (name === 'lang') {
                    return 'en';
                }

                if (name === 'region') {
                    return 'RU';
                }

                return null;
            });
            jest.spyOn(Controller, 'setCookie').mockReturnValue();

            constants.isBrowserPlatform = true;
            constants.isServerSide = false;

            stubAcceptLang = jest
                .spyOn(Controller, 'getAcceptLanguage')
                .mockReturnValue(['en-US', 'en;q=0.9', 'ru;q=0.8']);

            controller = new Controller({
                availableLanguages: ['en', 'ru'],
                availableRegions: ['RU', 'KZ'],
                defaultLanguage: 'en',
            });
        });

        afterEach(() => {
            constants.isBrowserPlatform = originalIsBrowser;
            constants.isServerSide = originIsServerSide;
        });

        test('if one locale is available controller should return it', () => {
            const RuController = new Controller({
                availableLanguages: ['ru'],
                defaultLanguage: 'ru',
            });

            expect(RuController.currentLocale).toStrictEqual('ru-RU');
            expect(RuController.currentLocaleNew).toStrictEqual('ru-RU');
            expect(RuController.currentLang).toStrictEqual('ru');
        });

        test('if localization is disabled should return default locale', () => {
            const emptyController = new Controller({
                availableLanguages: [],
                availableRegions: ['RU', 'KZ'],
                defaultLanguage: 'en',
            });

            expect(controller.currentLocaleNew).toStrictEqual('en-RU');
            expect(emptyController.currentLocale).toStrictEqual('en-US');
            expect(emptyController.currentLang).toStrictEqual('en');
        });

        describe('on client side', () => {
            test('should always return first read value from cookie', () => {
                expect(controller.currentLocale).toStrictEqual('en-US');
                expect(controller.currentLocaleNew).toStrictEqual('en-RU');

                stubCookie.mockImplementation((name) => {
                    if (name === 'lang') {
                        return 'ru';
                    }

                    if (name === 'region') {
                        return 'RU';
                    }

                    return null;
                });

                expect(controller.currentLocaleNew).toStrictEqual('en-RU');
                expect(controller.currentLocale).toStrictEqual('en-US');
            });

            test('should return default language if cookies have not lang value', () => {
                stubCookie.mockImplementation((name) => {
                    if (name === 'lang') {
                        return null;
                    }

                    if (name === 'region') {
                        return 'RU';
                    }

                    return null;
                });

                expect(controller.currentLocaleNew).toStrictEqual('en-RU');
                expect(controller.currentLocale).toStrictEqual('en-US');
            });
        });

        describe('on server side', () => {
            test('should always return actual value from cookies if it exists', () => {
                constants.isBrowserPlatform = false;

                expect(controller.currentLocaleNew).toStrictEqual('en-RU');
                expect(controller.currentLocale).toStrictEqual('en-US');

                stubCookie.mockImplementation((name) => {
                    if (name === 'lang') {
                        return 'ru';
                    }

                    if (name === 'region') {
                        return 'RU';
                    }

                    return null;
                });

                expect(controller.currentLocaleNew).toStrictEqual('ru-RU');
                expect(controller.currentLocale).toStrictEqual('ru-RU');
            });

            describe('cookie lang not exists', () => {
                test('should detect locale from accept-language', () => {
                    constants.isBrowserPlatform = false;

                    stubCookie.mockImplementation((name) => {
                        if (name === 'lang') {
                            return null;
                        }

                        if (name === 'region') {
                            return 'RU';
                        }

                        return null;
                    });
                    stubAcceptLang.mockReturnValue(['en-GB', 'en-US;q=0.9', 'ru;q=0.8']);

                    expect(controller.currentLocaleNew).toStrictEqual('en-RU');
                    expect(controller.currentLocale).toStrictEqual('en-US');
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

                        return null;
                    });

                    stubAcceptLang.mockReturnValue(['ru', 'en-US;q=0.9']);

                    expect(controller.currentLang).toStrictEqual('ru');
                    expect(controller.currentLocaleNew).toStrictEqual('ru-KZ');
                    expect(controller.currentLocale).toStrictEqual('ru-RU');
                });
            });
        });
    });

    describe('getTranslator', () => {
        beforeEach(() => {
            controller = new Controller({
                availableLanguages: ['en', 'ru'],
                defaultLanguage: 'en',
            });

            jest.spyOn(Loader.prototype, 'context').mockReturnValue(
                Promise.resolve({
                    en: {
                        Язык: 'Language',
                    },
                })
            );
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
            let stubSetDict: jest.SpiedFunction<(typeof Translator.prototype)['setDictionaries']>;

            beforeEach(() => {
                stubSetDict = jest.spyOn(Translator.prototype, 'setDictionaries');
            });

            test('should return instance Translator and when context was loaded added it in instance', () => {
                return new Promise((resolve) => {
                    stubSetDict.mockImplementation((context) => {
                        expect(context).toEqual({
                            en: {
                                Язык: 'Language',
                            },
                        });

                        resolve(true);
                    });

                    expect(controller.getTranslatorSync('context')).toBeInstanceOf(Translator);
                });
            });
        });
    });

    describe('isSupportedLang', () => {
        const controller = new Controller({
            availableLanguages: ['en', 'ru'],
            defaultLanguage: 'en',
        });

        test('should return true from "en-US"', () => {
            expect(controller.isSupportedLang('en-US')).toBeTruthy();
        });

        test('should return true from "en"', () => {
            expect(controller.isSupportedLang('en')).toBeTruthy();
        });

        test('should return false from "fr"', () => {
            expect(controller.isSupportedLang('fr')).toBeFalsy();
        });
    });

    describe('getImageUrl', () => {
        beforeEach(() => {
            controller = new Controller({
                availableLanguages: ['en', 'ru'],
                defaultLanguage: 'en',
            });

            jest.spyOn(conduct, 'getResourceUrl').mockImplementation((value) => {
                return value;
            });
            jest.spyOn(conduct, 'getModuleUrl').mockImplementation((value) => {
                return value;
            });
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
