/**
 * Библиотека, которая на самом деле является плагином "i18n!" Require.js.
 * @module
 * @library
 * @private
 * @author Кудрявцев И.С.
 */

export { default as Loader } from './_i18n/Loader';
export { default as TranslatableString } from './_i18n/TranslatableString';
export { default as Translator } from './_i18n/Translator';

import Controller, { IRequest, IConfigController } from './_i18n/Controller';
import constants from 'Env/Constants';

import IContents from './interfaces/IContents';
import type { langCode } from './interfaces/IAvailableCodes';
import IWasabyGlobal from './interfaces/IWasabyGlobal';

const MINIMALLY_COUNT_AVAILABLE_LANGUAGES = 2;

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
            availableRegions: ['RU', 'KZ', 'UZ', 'TM'],
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

/**
 * Екземпляр контролера локализации. Создаётся в момент загрузки страницы.
 */
const controller = new Controller(getConfig());

export { controller, Controller, IRequest, IConfigController };
