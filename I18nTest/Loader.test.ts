import Loader from 'I18n/_i18n/Loader';
import { langCode, localeCode } from 'I18n/interfaces/IAvailableCodes';
import IDictionary from 'I18n/interfaces/IDictionary';
import IContents from 'I18n/interfaces/IContents';
import russian from 'I18n/locales/ru';

describe('Loader', () => {
    const dictEn = {
        ключ: 'key',
    };
    const dictRu = {
        ключ: 'ключ',
    };
    const dictionaries: { [key in langCode | localeCode]?: IDictionary } = {
        en: dictEn,
        ru: dictRu,
    };
    const availableResources = {
        dict: ['en', 'en.css', 'ru', 'ru.css'],
    };
    const externalContents: IContents = {
        buildnumber: '1234',
        modules: {
            externalContext: availableResources,
        },
    };
    const loader = new Loader({
        context: availableResources,
        externalContext: {
            buildnumber: '12345',
            path: '/service/path/externalContext',
        },
    });

    describe('history', () => {
        test('should add contents in history', () => {
            loader.contents('contentsHistory', () => {
                return Promise.resolve({
                    buildnumber: '1234',
                    modules: {},
                });
            });

            expect(loader.history.contents.contentsHistory).toStrictEqual(
                'contentsHistory/contents.json'
            );
        });

        test('should add language in history', () => {
            loader.language('en', () => {
                return Promise.resolve({
                    default: russian,
                });
            });

            expect(loader.history.languages.hasOwnProperty('en')).toBeTruthy();
        });

        test('should add region in history', () => {
            loader.region('RU', () => {
                return Promise.resolve({
                    code: 'RU',
                    DateTimeFormats: {
                        DIGITAL_MONTH_FULL_YEAR: 'MM.YYYY',
                        DURATION_SHORT_TIME: 'HHH:mm',
                        DURATION_FULL_TIME: 'HHH:mm:ss',
                        FULL_DATE_DOW: "D MMMMlo'YY, ddddl",
                        DAY: 'D',
                        FULL_DATE: 'DD.MM.YY',
                        FULL_DATE_FULL_MONTH: "D MMMMlo'YY",
                        FULL_DATE_FULL_MONTH_FULL_YEAR: 'D MMMMlo YYYY',
                        FULL_DATE_FULL_YEAR: 'DD.MM.YYYY',
                        FULL_DATE_SHORT_MONTH: "D MMMlo'YY",
                        FULL_DATE_SHORT_MONTH_FULL_YEAR: 'D MMMlo YYYY',
                        FULL_DATE_SHORT_TIME: 'DD.MM.YY HH:mm',
                        FULL_DATE_FULL_TIME: 'DD.MM.YY HH:mm:ss',
                        FULL_DATE_FULL_TIME_FRACTION: 'DD.MM.YY HH:mm:ss.SSS',
                        FULL_DATE_FULL_YEAR_SHORT_TIME: 'DD.MM.YYYY HH:mm',
                        FULL_DATE_FULL_YEAR_FULL_TIME: 'DD.MM.YYYY HH:mm:ss',
                        FULL_DATE_FULL_YEAR_FULL_TIME_FRACTION: 'DD.MM.YYYY HH:mm:ss.SSS',
                        FULL_DATETIME: "D MMMlo'YY HH:mm",
                        FULL_HALF_YEAR: "YYYYhr'YY",
                        FULL_MONTH: "MMMM'YY",
                        MONTH: 'MMMM',
                        SHR_MONTH: 'MMM',
                        FULL_QUARTER: "QQQQr'YY",
                        QUARTER: 'Qr',
                        FULL_YEAR: 'YYYY',
                        FULL_TIME: 'HH:mm:ss',
                        FULL_TIME_FRACTION: 'HH:mm:ss.SSS',
                        ISO_DATETIME: 'YYYY-MM-DDTHH:mm:ss.SSSZZ',
                        ISO_DATETIME_SQL: 'YYYY-MM-DD HH:mm:ss.SSSZZ',
                        SHORT_DATE_DOW: 'D MMMMlo, ddddl',
                        SHORT_DATE_SHORT_DOW: 'D MMMMlo, ddl',
                        SHORT_DATE_SHORT_MONTH_SHORT_DOW: 'D MMMlo, ddl',
                        SHORT_DATE: 'DD.MM',
                        SHORT_DATE_FULL_MONTH: 'D MMMMlo',
                        SHORT_DATE_SHORT_MONTH: 'D MMMlo',
                        SHORT_DATE_SHORT_TIME: 'DD.MM HH:mm',
                        SHORT_DATE_FULL_TIME: 'DD.MM HH:mm:ss',
                        SHORT_DATE_FULL_TIME_FRACTION: 'DD.MM HH:mm:ss.SSS',
                        SHORT_DATETIME: 'D MMMlo HH:mm',
                        SHORT_HALF_YEAR: "YYhr'YY",
                        SHORT_MONTH: "MMM'YY",
                        SHORT_QUARTER: "QQr'YY",
                        SHORT_TIME: 'HH:mm',
                    },
                    NumberFormat: {
                        fractionSeparator: '.',
                        triadDelimiter: ' ',
                    },
                    Money: {
                        currency: 'рубль',
                        shortCurrency: 'руб',
                        superShortCurrency: 'р',
                        currencyDenominations: [10, 50, 100, 200, 500, 1000, 2000, 5000],
                        subunit: 'копейка',
                        shortSubunit: 'коп',
                        superShortSubunit: 'к',
                        subunitDenominations: [1, 5, 10, 50],
                        symbol: '₽',
                    },
                    Ecosystem: {
                        name: 'SABY',
                    },
                });
            });

            expect(loader.history.regions.hasOwnProperty('RU')).toBeTruthy();
        });

        test('should add style in history', () => {
            loader.style('styleHistory', 'en', () => {
                return Promise.resolve();
            });

            expect(loader.history.contexts.styleHistory.en.style).toStrictEqual(
                'styleHistory/lang/en/en'
            );
        });

        test('should add dictionary in history', () => {
            loader.dictionary('dictHistory', 'en', () => {
                return Promise.resolve({});
            });

            const dictionary = loader.history.contexts.dictHistory.en.dictionary;

            expect(dictionary).toStrictEqual('dictHistory/lang/en/en.json');
        });
    });

    describe('dictionary', () => {
        test('should load base dictionary', () => {
            const fareLoader = (path: string) => {
                expect(path).toStrictEqual('context/lang/en/en.json');

                return Promise.resolve(dictEn);
            };

            return loader.dictionary('context', 'en', fareLoader).then((dict) => {
                expect(dict).toEqual(['en', dictEn]);
            });
        });
    });

    describe('style', () => {
        test('should load base css', () => {
            const fareLoader = (path: string) => {
                expect(path).toStrictEqual('native-css!context/lang/en/en');

                return Promise.resolve();
            };

            return loader.style('context', 'en', fareLoader);
        });
    });

    describe('context', () => {
        const expectAvailableLanguages: langCode[] = ['ru', 'en'];

        beforeEach(() => {
            jest.spyOn(loader, 'style').mockReturnValue(Promise.resolve());
            jest.spyOn(loader, 'dictionary').mockImplementation(async (context, key) => {
                if (context) {
                    return [key.split('-')[0] as langCode, dictionaries[key] || {}];
                }

                throw new Error(`Context name is incorrect: ${context}`);
            });
            jest.spyOn(loader, 'contents').mockReturnValue(Promise.resolve(externalContents));
        });

        test('should return context with russian dictionary', () => {
            return loader.context('context', ['ru'], 'RU').then((value) => {
                expect(Object.keys(value)).toEqual(['ru']);
                expect(value.ru).toEqual(dictRu);
            });
        });

        test('should return context with all dictionary', () => {
            return loader.context('context', ['ru', 'en'], 'RU').then((context) => {
                expect(Object.keys(context).length).toStrictEqual(expectAvailableLanguages.length);

                for (const code of expectAvailableLanguages) {
                    expect(context).toHaveProperty(code);
                    expect(context[code]).toEqual(dictionaries[code]);
                }
            });
        });

        test('should return external context', () => {
            return loader.context('externalContext', ['ru', 'en'], 'RU').then((externalContext) => {
                expect(Object.keys(externalContext).length).toStrictEqual(
                    expectAvailableLanguages.length
                );

                for (const code of expectAvailableLanguages) {
                    expect(externalContext).toHaveProperty(code);
                    expect(externalContext[code]).toEqual(dictionaries[code]);
                }
            });
        });
    });

    describe('contents', () => {
        test('should return loaded contents', () => {
            const fakeLoader = (url: string): Promise<IContents> => {
                return new Promise((resolve) => {
                    expect(url).toStrictEqual('externalContext/contents.json');

                    resolve(externalContents);
                });
            };

            return loader.contents('externalContext', fakeLoader).then((contents) => {
                expect(contents).toEqual(externalContents);
            });
        });
    });
});
