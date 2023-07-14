import Translator from 'I18n/_i18n/Translator';
import Controller from 'I18n/_i18n/Controller';
import TranslatableString from 'I18n/_i18n/TranslatableString';
import enUS from 'I18n/locales/en-US';
import { constants } from 'Env/Env';

describe('Translator', () => {
    const context = {
        'en-US': {
            Замок: 'Lock',
            'context@@Замок': 'Castle',
            'plural#Язык': 'Language|Languages',
            'context@@plural#Язык': 'Tongue|Tongues',
            empty: '',
        },
    };

    const controller = new Controller({
        availableLocales: ['en-US'],
        defaultLocale: 'en-US',
    });
    const translator = new Translator(context, controller);

    const originalIsServerSide = constants.isServerSide;
    let stubCurrentLocaleConfig;

    beforeEach(() => {
        stubCurrentLocaleConfig = jest
            .spyOn(controller, 'currentLocaleConfig', 'get')
            .mockReturnValue(enUS);
        constants.isServerSide = false;
    });

    afterEach(() => {
        stubCurrentLocaleConfig.mockRestore();
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

        it('should return empty string', () => {
            expect(translator.translate('empty')).toStrictEqual('');
        });
    });
});
