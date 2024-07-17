import Controller, { IConfigController } from './Controller';
import Translator from './Translator';
import constants from 'Env/Constants';

import IContents from './../interfaces/IContents';
import type { langCode } from '../interfaces/IAvailableCodes';
import IRegionConfig from './../interfaces/IRegionConfig';
import ILangConfig from './../interfaces/ILangConfig';
import IWasabyGlobal from '../interfaces/IWasabyGlobal';

import 'text';
import 'native-css';

interface ILangConfigFile {
    default: ILangConfig;
}

// eslint-disable-next-line
// eslint-disable-next-line deprecated-anywhere
type aliasName = 'Core' | 'Deprecated' | 'Lib' | 'Transport';

const alias: { [name in aliasName]: string } = {
    Core: 'WS.Core',
    // eslint-disable-next-line
    // eslint-disable-next-line deprecated-anywhere
    Deprecated: 'WS.Deprecated',
    Lib: 'WS.Core',
    Transport: 'WS.Core',
};
const MINIMALLY_COUNT_AVAILABLE_LANGUAGES = 2;

const configController = getConfig();

const controller = new Controller(configController);
const emptyTranslator = new Translator({}, controller);
const defaultTranslator = (
    key: string,
    context?: string | number,
    pluralNumber?: number,
    isTemplate?: boolean
) => {
    return emptyTranslator.translate(key, context, pluralNumber, isTemplate);
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
                'I18n/locales/en',
                'I18n/locales/ru',
                'I18n/locales/ar',
                'I18n/locales/he',
                'I18n/locales/fr',
                'I18n/locales/kk',
                'I18n/locales/uz',
                'I18n/locales/tk',

                'LocalizationConfigs/localization_configs/RU.json',
                'LocalizationConfigs/localization_configs/KZ.json',
                'LocalizationConfigs/localization_configs/UZ.json',
            ], (
                en: ILangConfigFile,
                ru: ILangConfigFile,
                ar: ILangConfigFile,
                he: ILangConfigFile,
                fr: ILangConfigFile,
                kk: ILangConfigFile,
                uz: ILangConfigFile,
                tk: ILangConfigFile,
                RU: IRegionConfig,
                KZ: IRegionConfig,
                UZ: IRegionConfig
            ) => {
                controller.addRegion('RU', RU, false);
                controller.addRegion('KZ', KZ, false);
                controller.addRegion('UZ', UZ, false);

                controller.addLang('en', en.default, false);
                controller.addLang('ru', ru.default, false);
                controller.addLang('ar', ar.default, false);
                controller.addLang('he', he.default, false);
                controller.addLang('fr', fr.default, false);
                controller.addLang('kk', kk.default, false);
                controller.addLang('uz', uz.default, false);
                controller.addLang('tk', tk.default, false);

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
        const translator = controller.getTranslatorSync(contextName);

        onLoad((translator as Translator).translate.bind(translator));

        return;
    }

    (controller.getTranslator(contextName) as Promise<Translator>)
        .then((translator) => {
            onLoad(translator.translate.bind(translator));
        })
        .catch(() => {
            onLoad(defaultTranslator);
        });
}

function getContextName(name: string): string {
    const contextName = name.split('/')[0];

    return alias.hasOwnProperty(contextName) ? alias[contextName as aliasName] : contextName;
}

function getConfig(): IConfigController {
    let defaultLanguage: langCode = 'ru';
    const contents: IContents = (globalThis as unknown as IWasabyGlobal).contents;

    if (contents) {
        const availableLanguages = prepareAvailableLanguage(contents.availableLanguage);
        defaultLanguage = (contents.defaultLanguage?.split('-')[0] as langCode) || defaultLanguage;

        if (constants.isBrowserPlatform) {
            setLocalizationBL(availableLanguages, defaultLanguage);
        }

        return {
            // TODO должны получать из contents-а, но пока там нет данной инфы, поэтому добавляем всё что есть.
            availableRegions: ['RU', 'KZ', 'UZ'],
            availableLanguages,
            defaultLanguage,
            availableContexts: contents.modules,
        };
    }

    return {
        defaultLanguage,
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
function setLocalizationBL(availableLanguage: langCode[] = [], defaultLanguage: langCode): void {
    if (availableLanguage.length < MINIMALLY_COUNT_AVAILABLE_LANGUAGES) {
        Controller.setCookie('lang_ignore', 'bl');
        Controller.setCookie('lang', defaultLanguage);
    } else if (Controller.getCookie('lang_ignore') === 'bl') {
        // Если для приложения есть поддержка указаного языка, то надо убрать куку для bl.
        Controller.removeCookie('lang_ignore');
    }
}

function prepareAvailableLanguage(availableLanguage: object = {}): langCode[] {
    const result: langCode[] = [];

    for (const locale of Object.keys(availableLanguage)) {
        if (Controller.isLangCode(locale)) {
            result.push(locale as langCode);
        }
    }

    return result;
}
