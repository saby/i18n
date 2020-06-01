import Translator from 'I18n/_i18n/Translator';
import Controller from 'I18n/_i18n/Controller';
import TranslatableString from 'I18n/_i18n/TranslatableString';
import {constants} from 'Env/Env';
import {assert} from 'chai';
import * as sinon from 'sinon';

describe('Translator', () => {
    const context = {
        'en-US': {
            Замок: 'Lock',
            'context@@Замок': 'Castle',
            'plural#Язык': 'Language|Languages',
            'context@@plural#Язык': 'Tongue|Tongues',
            empty: ''
        }
    };

    const localeConfig = {
        code: 'en-US',
        plural: (pluralNumber, firstWord, secondWord) => {
            if (pluralNumber > 1 || pluralNumber === 0) {
                return secondWord;
            }

            return firstWord;
        }
    };

    const controller = new Controller({
        availableLocales: ['en-US'],
        defaultLocale: 'en-US'
    });
    const translator = new Translator(context, controller);

    let stubIsServerSide;
    let stubCurrentLocaleConfig;

    before(() => {
        stubCurrentLocaleConfig = sinon.stub(controller, 'currentLocaleConfig');

        stubCurrentLocaleConfig.get(() => localeConfig);
    });

    after(() => {
        stubCurrentLocaleConfig.restore();

        stubCurrentLocaleConfig = undefined;
    });

    beforeEach(() => {
        stubIsServerSide = sinon.stub(constants, 'isServerSide');

        stubIsServerSide.get(() => false);
        stubCurrentLocaleConfig.get(() => localeConfig);
    });

    afterEach(() => {
        stubIsServerSide.restore();

        stubIsServerSide = undefined;
    });

    describe('translate', () => {
        it ('should instance TranslatableString on server side', () => {
            stubIsServerSide.get(() => true);

            assert.instanceOf(translator.translate('Замок'), TranslatableString);
        });

        it('should return original key if dictionary has not it', () => {
            assert.strictEqual(translator.translate('Лето'), 'Лето');
        });

        it ('should return translated key', () => {
            assert.strictEqual(translator.translate('Замок'), 'Lock');
        });

        it ('should return translated key by context', () => {
            assert.strictEqual(translator.translate('Замок', 'context'), 'Castle');
            assert.strictEqual(translator.translate('context@@Замок'), 'Castle');
        });

        it ('should return translated key in plural form', () => {
            const pluralNumber = 5;

            assert.strictEqual(translator.translate('Язык', 1), 'Language');
            assert.strictEqual(translator.translate('Язык', pluralNumber), 'Languages');
        });

        it ('should return translated key in plural form and by context', () => {
            const pluralNumber = 5;

            assert.strictEqual(translator.translate('Язык', 'context', 1), 'Tongue');
            assert.strictEqual(translator.translate('Язык', 'context', pluralNumber), 'Tongues');
        });

        it ('should return empty string', () => {
            assert.strictEqual(translator.translate('empty'), '');
        });
    });
});
