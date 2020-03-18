/**
 * Library for internationalization
 * @library I18n/i18n
 * @includes Locale I18n/_i18n/Locale
 * @includes Configuration I18n/_i18n/Configuration
 * @includes Loader I18n/_i18n/Loader
 * @includes keyboard I18n/_i18n/keyboard
 * @public
 * @author Кудрявцев И.С.
 */

import * as keyboard from './_i18n/keyboard';

export {keyboard};
export {default as Locale} from './_i18n/Locale';
export {default as Configuration} from './_i18n/Configuration';
export {default as IConfiguration} from './_i18n/IConfiguration';
export {default as Loader} from './_i18n/Loader';
