/**
 * Библиотека для работы с локализацией.
 * @library I18n/i18n
 * @includes Translator I18n/_i18n/Translator
 * @includes Loader I18n/_i18n/Loader
 * @includes controller I18n/_i18n/Controller
 * @public
 * @author Кудрявцев И.С.
 */

import controller, {load} from './_i18n/SingletonController';

export {
    load,
    controller
};

export {default as Translator} from './_i18n/Translator';
export {default as Controller} from './_i18n/Controller';
export {default as Loader} from './_i18n/Loader';
