import Loader from 'I18n/_i18n/Loader';

describe('Loader', () => {
    const dictEn = {
        ключ: 'key',
    };
    const dictRu = {
        ключ: 'ключ',
    };
    const dictionary = {
        en: dictEn,
        'ru-RU': dictRu,
    };
    const availableResources = {
        dict: ['en', 'en.css', 'ru-RU', 'ru-RU.css'],
    };
    const externalContents = {
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
                return Promise.resolve({});
            });

            expect(loader.history.contents.contentsHistory).toStrictEqual(
                'contentsHistory/contents.json'
            );
        });

        test('should add locale in history', () => {
            loader.locale('en-US', () => {
                return Promise.resolve({});
            });

            expect(loader.history.locales.hasOwnProperty('en-US')).toBeTruthy();
        });

        test('should add style in history', () => {
            loader.style('styleHistory', 'en-US', () => {
                return Promise.resolve({});
            });

            expect(loader.history.contexts.styleHistory['en-US'].style).toStrictEqual(
                'styleHistory/lang/en/en-US'
            );
        });

        test('should add dictionary in history', () => {
            loader.dictionary('dictHistory', 'en-US', () => {
                return Promise.resolve({});
            });

            const dictionary = loader.history.contexts.dictHistory['en-US'].dictionary;

            expect(dictionary).toStrictEqual('dictHistory/lang/en/en-US.json');
        });
    });

    describe('dictionary', () => {
        test('should load base dictionary', () => {
            const fareLoader = (path) => {
                expect(path).toStrictEqual('context/lang/en/en.json');

                return Promise.resolve(dictEn);
            };

            return loader.dictionary('context', 'en', fareLoader).then((dict) => {
                expect(dict).toEqual(['en', dictEn]);
            });
        });

        test('should load advanced dictionary', () => {
            const fareLoader = (path) => {
                expect(path).toStrictEqual('context/lang/en/en-US.json');

                return Promise.resolve(dictEn);
            };

            return loader.dictionary('context', 'en-US', fareLoader).then((dict) => {
                expect(dict).toEqual(['en-US', dictEn]);
            });
        });
    });

    describe('style', () => {
        test('should load base css', () => {
            const fareLoader = (path) => {
                expect(path).toStrictEqual('native-css!context/lang/en/en');

                return Promise.resolve();
            };

            return loader.style('context', 'en', fareLoader);
        });

        test('should load advanced css', () => {
            const fareLoader = (path) => {
                expect(path).toStrictEqual('native-css!context/lang/en/en-US');

                return Promise.resolve();
            };

            return loader.style('context', 'en-US', fareLoader);
        });
    });

    describe('context', () => {
        let stubLoaderDict;
        let stubLoaderCss;
        let stubContents;

        const expectAvailableLanguages = ['ru-RU', 'en-US', 'en-GB', 'en'];
        const dictionaries = {
            'en-US': dictEn,
            'en-GB': dictEn,
            en: dictEn,
            'ru-RU': dictRu,
        };

        beforeEach(() => {
            stubLoaderDict = jest.spyOn(loader, 'dictionary').mockImplementation((context, key) => {
                return Promise.resolve([key, dictionary[key]]);
            });
            stubLoaderCss = jest.spyOn(loader, 'style').mockReturnValue(Promise.resolve());
            stubContents = jest
                .spyOn(loader, 'contents')
                .mockReturnValue(Promise.resolve(externalContents));
        });

        afterEach(() => {
            stubLoaderDict.mockRestore();
            stubLoaderCss.mockRestore();
            stubContents.mockRestore();
        });

        test('should return context with russian dictionary', () => {
            return loader.context('context', ['ru-RU']).then((value) => {
                expect(Object.keys(value)).toEqual(['ru-RU']);
                expect(value['ru-RU']).toEqual(dictRu);
            });
        });

        test('should return context with all dictionary', () => {
            return loader.context('context', ['ru-RU', 'en-US', 'en-GB']).then((context) => {
                expect(Object.keys(context).length).toStrictEqual(expectAvailableLanguages.length);

                for (const code of expectAvailableLanguages) {
                    expect(context).toHaveProperty(code);
                    expect(context[code]).toEqual(dictionaries[code]);
                }
            });
        });

        test('should return external context', () => {
            return loader
                .context('externalContext', ['ru-RU', 'en-US', 'en-GB'])
                .then((externalContext) => {
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
            const fakeLoader = (url) => {
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
