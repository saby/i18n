import {assert} from 'chai';
import * as sinon from 'sinon';
import Locale from 'I18n/_i18n/Locale';
import configLang from 'I18n/locales/language/en';
import configFormat from 'I18n/locales/format/US';
import {constants} from 'Env/Env';

describe('Locale', () => {
    ['browser', 'node'].forEach((env) => {
        describe(env, () => {
            let stub;

            beforeEach(() => {
                stub = sinon.stub(constants, 'isBrowserPlatform').get(() => env === 'browser');
            });

            afterEach(() => {
                stub.restore();
            });

            describe('rk', () => {
                const config = Object.assign({}, configLang, configFormat);
                config.code = 'en-US';

                const i18n = new Locale(config);

                Locale.setDictionary({
                    'Английский': 'English',
                    'TEST@@Русский': 'Russian',
                    'plural#язык': 'language|languages',
                    'plural#Пустота': 'Empty',
                    'TEST@@plural#ступня': 'foot|foots',
                    'у': ''
                }, 'TEST/Dictionary', 'en-US');


                it('empty translate', () => {
                    assert.equal(i18n.rk('Английский'), 'English');
                });

                it('word translated to an empty string', () => {
                    assert.equal(i18n.rk('у'), '');
                });

                it('context translate', () => {
                    assert.equal(i18n.rk('Русский', 'TEST'), 'Russian');
                    assert.equal(i18n.rk('Русский'), 'Русский');
                });

                it('not have plural form', () => {
                    assert.equal(i18n.rk('Пустота', 1), 'Empty');
                    assert.equal(i18n.rk('Пустота', 2), 'Пустота');
                });

                it('plural translate', () => {
                    assert.equal(i18n.rk('язык', 1), 'language');
                    assert.equal(i18n.rk('язык', 2), 'languages');
                });

                it('plural and context translate', () => {
                    assert.equal(i18n.rk('ступня', 'TEST', 1), 'foot');
                    assert.equal(i18n.rk('ступня', 'TEST', 2), 'foots');
                    assert.equal(i18n.rk('ступня', 2), 'ступня');
                    assert.equal(i18n.rk('ступня', 'TEST'), 'ступня');
                });

                it('not translate', () => {
                    assert.equal(i18n.rk('Merci'), 'Merci');
                });
            });

            it('setDictionary', () => {
                Locale.setDictionary({
                    'Словарь': 'Dictionary'
                }, 'TEST/setDictionaryTest', 'en-US');


                assert.equal(Locale.hasDictionary('TEST/setDictionaryTest', 'en-US'), true);
            });

            it('hasDictionary', () => {
                Locale.setDictionary({
                    'Словарь': 'Dictionary'
                }, 'TEST/hasDictionary', 'en-US');


                assert.equal(Locale.hasDictionary('TEST/hasDictionary', 'en-US'), true);
                assert.equal(Locale.hasDictionary('TEST/hotHasDictionary', 'en-US'), false);
            });
        });
    });
});
