import Translator from 'I18n/_i18n/Translator';
import Controller from 'I18n/_i18n/Controller';
import TranslatableString from 'I18n/_i18n/TranslatableString';
import Locale from 'I18n/_i18n/Locale';
import constants from 'Env/Constants';
import en from 'I18n/locales/en';

// @ts-ignore
import RU = require('LocalizationConfigs/localization_configs/RU.json');

const enRU = new Locale('en-RU', en, RU);

describe('Translator', () => {
    const context = {
        en: {
            Замок: 'Lock',
            'context@@Замок': 'Castle',
            'plural#Язык': 'Language|Languages',
            'context@@plural#Язык': 'Tongue|Tongues',
            'template#Иди сюда': 'Come this:::{5-8}',
            'context@@template#Иди сюда': 'Come this:::{4-7}',
            empty: '',
        },
    };

    const controller = new Controller({
        availableLanguages: ['en'],
        defaultLanguage: 'en',
    });
    const translator = new Translator(context, controller);

    const originalIsServerSide = constants.isServerSide;

    beforeEach(() => {
        jest.spyOn(Controller, 'getCookie').mockImplementation((name) => {
            if (name === 'lang') {
                return 'en';
            }

            if (name === 'region') {
                return 'RU';
            }

            return null;
        });
        jest.spyOn(controller, 'currentLocaleConfig', 'get').mockReturnValue(enRU);

        constants.isServerSide = false;
    });

    afterEach(() => {
        constants.isServerSide = originalIsServerSide;
    });

    describe('translate', () => {
        it('should instance TranslatableString on server side', () => {
            constants.isServerSide = true;

            expect(translator.translate('Замок')).toBeInstanceOf(TranslatableString);
        });

        test('should return original key if dictionary has not it', () => {
            expect(translator.translate('Лето')).toStrictEqual('Лето');
        });

        it('should return translated key', () => {
            expect(translator.translate('Замок')).toStrictEqual('Lock');
        });

        it('should return translated key by context', () => {
            expect(translator.translate('Замок', 'context')).toStrictEqual('Castle');
            expect(translator.translate('context@@Замок')).toStrictEqual('Castle');
        });

        it('should return translated key in plural form', () => {
            const pluralNumber = 5;

            expect(translator.translate('Язык', 1)).toStrictEqual('Language');
            expect(translator.translate('Язык', pluralNumber)).toStrictEqual('Languages');
        });

        it('should return translated key in plural form and by context', () => {
            const pluralNumber = 5;

            expect(translator.translate('Язык', 'context', 1)).toStrictEqual('Tongue');
            expect(translator.translate('Язык', 'context', pluralNumber)).toStrictEqual('Tongues');
        });

        it('should return translated key for template string', () => {
            expect(translator.translate('Иди сюда', undefined, undefined, true)).toStrictEqual(
                'Come this:::{5-8}'
            );
            expect(translator.translate('Иди сюда', 'context', undefined, true)).toStrictEqual(
                'Come this:::{4-7}'
            );
        });

        it('should return empty string', () => {
            expect(translator.translate('empty')).toStrictEqual('');
        });
    });
});
