import Controller, { IConfigController } from './Controller';
import Translator from './Translator';
import { constants, cookie } from 'Env/Env';

import IContents from './../interfaces/IContents';

import 'text';
import 'native-css';

export interface IGlobal {
    requirejs: Require;
    contents: IContents;
}

const alias = {
    Core: 'WS.Core',
    Deprecated: 'WS.Deprecated',
    Lib: 'WS.Core',
    Transport: 'WS.Core',
};
const EXPIRES_IGNORE_LANG_BL = 365;
const MINIMALLY_COUNT_AVAILABLE_LANGUAGES = 2;

const configController = getConfig();

const controller = new Controller(configController);
const emptyTranslator = new Translator({}, controller);
const defaultTranslator = (key: string, context?: string | number, pluralNumber?: number) => {
    return emptyTranslator.translate(key, context, pluralNumber);
};

export default controller;
export { Controller, Translator };

export function load(name: string, require: Require, onLoad: Function): void {
    if (name.includes('controller?')) {
        /*
          На сервисе представления мнимая асинхроность, которая костыльными путями превращается в синхроность,
          и попытка использовать честный асинхронный промис ломает загрузку файлов.
          Приходиться грузить все локали вручную require-ом и добавлять в контроллер.
         */
        if (constants.isServerSide) {
            require([
                'I18n/locales/en-US',
                'I18n/locales/en-GB',
                'I18n/locales/ru-RU',
                'I18n/locales/ar-AE',
                'I18n/locales/he-IL',
                'I18n/locales/fr-FR',
                'I18n/locales/kk-KZ',
                'I18n/locales/ru-KZ',
                'I18n/locales/en-KZ',
                'I18n/locales/uz-UZ',
            ], (enUS, enGB, ruUR, arAE, heIL, frFR, kkKZ, ruKZ, enKZ, uzUZ) => {
                controller.addLocale('en-US', enUS.default, false);
                controller.addLocale('en-GB', enGB.default, false);
                controller.addLocale('ru-RU', ruUR.default, false);
                controller.addLocale('ar-AE', arAE.default, false);
                controller.addLocale('he-IL', heIL.default, false);
                controller.addLocale('fr-FR', frFR.default, false);
                controller.addLocale('kk-KZ', kkKZ.default, false);
                controller.addLocale('ru-KZ', ruKZ.default, false);
                controller.addLocale('en-KZ', enKZ.default, false);
                controller.addLocale('uz-UZ', uzUZ.default, false);

                onLoad(controller);
            });

            return;
        }

        controller.isReady().then(() => {
            onLoad(controller);
        });

        return;
    }

    if (!controller.isEnabled) {
        onLoad(defaultTranslator);

        return;
    }

    const contextName = getContextName(name);

    if (!contextName) {
        onLoad(defaultTranslator);

        return;
    }

    if (controller.translators.hasOwnProperty(contextName)) {
        const translator = controller.translators[contextName];

        onLoad(translator.translate.bind(translator));

        return;
    }

    if (constants.isServerSide) {
        const translator = controller.getTranslator(contextName, true);

        onLoad((translator as Translator).translate.bind(translator));

        return;
    }

    (controller.getTranslator(contextName) as Promise<Translator>)
        .then((translator) => {
            onLoad(translator.translate.bind(translator));
        })
        .catch((err) => {
            onLoad(defaultTranslator);
        });
}

function getContextName(name: string): string {
    const contextName = name.split('/')[0];

    return alias.hasOwnProperty(contextName) ? alias[contextName] : contextName;
}

function getConfig(): IConfigController {
    const global = (function (): IGlobal {
        // eslint-disable-next-line no-sequences, no-eval
        return this || (0, eval)('this');
    })();

    let defaultLocale = 'ru-RU';

    if (global.contents) {
        const availableLocales = prepareAvailableLanguage(global.contents.availableLanguage);
        defaultLocale = global.contents.defaultLanguage || defaultLocale;

        if (constants.isBrowserPlatform) {
            setLocalizationBL(availableLocales, defaultLocale);
        }

        return {
            availableLocales,
            defaultLocale,
            availableContexts: global.contents.modules,
        };
    }

    return {
        defaultLocale,
    };
}

/* Диспетчер выставляет единую куки lang по всем приложениям персоны, но есть приложения,
которые могут не поддерживать выбранный язык, ui-локализация имеет информацию о доступных языках для приложения,
но в BL-локализации такой инормации нет и она переводит ключи согласно переданной куке lang,
в результате компоненты, которые имеют поддержку локали из в куке lang, вернутся переведёнными,
в итоге получаем частично лоаклизованный интерфейс.
Пример: reg.tensor и online имеют общие компоненты, но reg не поддерживает английский язык,
а персона у приложений общая, в результате данные с бл для общих компонентов приходят в английской локале.
Поэтому выставляем куку, чтобы диспетчер не перебивал lang и выставляем в неё дефолтную локаль. */
function setLocalizationBL(availableLocales: string[] = [], defaultLocale: string): void {
    if (availableLocales.length < MINIMALLY_COUNT_AVAILABLE_LANGUAGES) {
        cookie.set('lang_ignore', 'bl', {
            expires: EXPIRES_IGNORE_LANG_BL,
            path: '/',
        });
        cookie.set('lang', defaultLocale, {
            expires: EXPIRES_IGNORE_LANG_BL,
            path: '/',
        });
    } else if (cookie.get('lang_ignore') === 'bl') {
        // Если для приложения есть поддержка указаного языка, то надо убрать куку для bl.
        cookie.set('lang_ignore', null, { path: '/' });
    }
}

function prepareAvailableLanguage(availableLanguage: object = {}): string[] {
    const result = [];

    for (const locale of Object.keys(availableLanguage)) {
        if (Controller.isLocaleCode(locale)) {
            result.push(locale);
        }
    }

    return result;
}
