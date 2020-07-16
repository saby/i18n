/**
 * Библиотека для работы с локализацией.
 * @library I18n/i18n
 * @includes Translator I18n/_i18n/Translator
 * @includes Loader I18n/_i18n/Loader
 * @includes controller I18n/_i18n/Controller
 * @includes keyboard I18n/keyboard
 * @public
 * @author Кудрявцев И.С.
 */

import * as keyboard from './keyboard';
import controller, {load} from './_i18n/SingletonController';

export {
    keyboard,
    load,
    controller
};

export {default as Translator} from './_i18n/Translator';
export {default as Controller} from './_i18n/Controller';
export {default as Locale} from './_i18n/Locale';
export {default as Configuration} from './_i18n/Configuration';
export {default as IConfiguration} from './_i18n/IConfiguration';
export {default as Loader} from './_i18n/Loader';
