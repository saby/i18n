import TranslatableString from 'I18n/_i18n/TranslatableString';
import Translator from 'I18n/_i18n/Translator';
import Controller from 'I18n/_i18n/Controller';
import Locale from 'I18n/_i18n/Locale';
import en from 'I18n/locales/en';
import fr from 'I18n/locales/fr';
// @ts-ignore
import RU = require('LocalizationConfigs/localization_configs/RU.json');

const enRU = new Locale('en-RU', en, RU);
const frRU = new Locale('fr-RU', fr, RU);

describe('TranslatableString', () => {
    const context = {
        en: {
            Замок: 'Castle',
        },
        fr: {
            Замок: 'Château',
        },
    };

    const controller = new Controller({
        availableLanguages: ['en', 'fr'],
        defaultLanguage: 'en',
    });
    const translator = new Translator(context, controller);
    const translatableString = new TranslatableString('Замок', () => {
        return translator.translateKey('Замок');
    });

    let stubCurrentLocaleConfig: jest.SpiedFunction<() => Locale>;
    let stubCookie: jest.SpiedFunction<(typeof Controller)['getCookie']>;

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
        stubCurrentLocaleConfig = jest
            .spyOn(controller, 'currentLocaleConfig', 'get')
            .mockReturnValue(enRU);
    });

    test('should return instance String', () => {
        expect(TranslatableString.getNativeString('Замок')).toBeInstanceOf(String);
    });

    test('should translated key from en', () => {
        expect(translatableString.toString()).toStrictEqual('Castle');
    });

    test('should translated key from fr', () => {
        stubCookie.mockImplementation((name) => {
            if (name === 'lang') {
                return 'fr';
            }

            if (name === 'region') {
                return 'RU';
            }

            return null;
        });
        stubCurrentLocaleConfig.mockReturnValue(frRU);

        expect(translatableString.toString()).toStrictEqual('Château');
    });

    test('toJSON should return translated key', () => {
        expect(translatableString.toJSON()).toStrictEqual('Castle');
    });

    test('valueOf should return translated key', () => {
        expect(translatableString.valueOf()).toStrictEqual('Castle');
    });
});
