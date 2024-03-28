/**
 * Библиотека, которая на самом деле является плагином "i18n!" Require.js.
 * @private
 * @author Кудрявцев И.С.
 */

export { default as Translator } from './_i18n/Translator';
export { default as Controller } from './_i18n/Controller';
export { default as Loader } from './_i18n/Loader';
export { default as TranslatableString } from './_i18n/TranslatableString';

import controller, { load } from './_i18n/requireJsPlugin';

export { load, controller };
