import TranslatableString from 'I18n/_i18n/TranslatableString';
import Translator from 'I18n/_i18n/Translator';
import Controller from 'I18n/_i18n/Controller';
import enUS from 'I18n/locales/en-US';
import frFR from 'I18n/locales/fr-FR';

describe('TranslatableString', () => {
    const context = {
        'en-US': {
            Замок: 'Castle',
        },
        'fr-FR': {
            Замок: 'Château',
        },
    };

    const controller = new Controller({
        defaultLocale: 'en-US',
    });
    const translator = new Translator(context, controller);
    const translatableString = new TranslatableString('Замок', () => {
        return translator.translateKey('Замок');
    });

    let stubCurrentLocaleConfig;

    beforeEach(() => {
        stubCurrentLocaleConfig = jest
            .spyOn(controller, 'currentLocaleConfig', 'get')
            .mockReturnValue(enUS);
    });

    afterEach(() => {
        stubCurrentLocaleConfig.mockRestore();
    });

    test('should return instance String', () => {
        expect(TranslatableString.getNativeString('Замок')).toBeInstanceOf(String);
    });

    test('should translated key from en-US', () => {
        expect(translatableString.toString()).toStrictEqual('Castle');
    });

    test('should translated key from fr-FR', () => {
        stubCurrentLocaleConfig.mockReturnValue(frFR);

        expect(translatableString.toString()).toStrictEqual('Château');
    });

    test('toJSON should return translated key', () => {
        expect(translatableString.toJSON()).toStrictEqual('Castle');
    });

    test('valueOf should return translated key', () => {
        expect(translatableString.valueOf()).toStrictEqual('Castle');
    });
});
