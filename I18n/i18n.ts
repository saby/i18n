/**
 * Library for internationalization
 * @library I18n/i18n
 * @includes Locale I18n/_i18n/Locale
 * @includes Configuration I18n/_i18n/Configuration
 * @includes Loader I18n/_i18n/Loader
 * @includes utils I18n/_i18n/utils
 * @public
 * @author Кудрявцев И.С.
 */

import * as utils from './_i18n/utils';

export {utils};
export {default as Locale} from './_i18n/Locale';
export {default as Configuration} from './_i18n/Configuration';
export {default as IConfiguration} from './_i18n/IConfiguration';
export {default as Loader} from './_i18n/Loader';
