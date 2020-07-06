import {assert} from 'chai';
import * as sinon from 'sinon';
import Loader from 'I18n/_i18n/Loader';

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

    describe('history', () => {
        it('should add contents in history', () => {
            loader.contents('contentsHistory', () => {
                return Promise.resolve({});
            });

            assert.isTrue(loader.history.contents.includes('json!contentsHistory/contents.json'));
        });

        it('should add locale in history', () => {
            loader.locale('en-US', () => {
                return Promise.resolve({});
            });

            assert.isTrue(loader.history.locales.includes('I18n/locales/en-US'));
        });

        it('should add style in history', () => {
            loader.style('styleHistory', 'en-US', () => {
                return Promise.resolve({});
            });

            assert.strictEqual(loader.history.contexts.styleHistory['en-US'].style, 'styleHistory/lang/en/en-US');
        });


        it('should add dictionary in history', () => {
            loader.dictionary('dictHistory', 'en-US', () => {
                return Promise.resolve({});
            });

            assert.strictEqual(
                loader.history.contexts.dictHistory['en-US'].dictionary,
                'dictHistory/lang/en/en-US.json'
            );
        });
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

    describe('style', () => {
        it('should load base css', () => {
            const fareLoader = (path) => {
                assert.strictEqual(path, 'native-css!context/lang/en/en');

                return Promise.resolve();
            };

            return loader.style('context', 'en', fareLoader);
        });

        it('should load advanced css', () => {
            const fareLoader = (path) => {
                assert.strictEqual(path, 'native-css!context/lang/en/en-US');

                return Promise.resolve();
            };

            return loader.style('context', 'en-US', fareLoader);
        });
    });

    describe('context', () => {
        let stubLoaderDict;
        let stubLoaderCss;
        let stubContents;

        before(() => {
            stubLoaderDict = sinon.stub(loader, 'dictionary');
            stubLoaderCss = sinon.stub(loader, 'style');
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
        it('should return loaded contents', () => {
            const fakeLoader = (url) => new Promise((resolve) => {
                assert.strictEqual(url, 'json!externalContext/contents.json');
                resolve(externalContents);
            });

            return loader.contents('externalContext', fakeLoader).then((contents) => {
                assert.deepEqual(contents, externalContents);
            });
        });
    });
});
