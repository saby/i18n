/**
 * Библиотека, которая на самом деле является плагином "i18n!" Require.js.
 * @module
 * @library
 * @private
 * @author Кудрявцев И.С.
 */

export { default as Translator } from './_i18n/Translator';
export { default as Controller, IRequest } from './_i18n/Controller';
export { default as Loader } from './_i18n/Loader';
export { default as TranslatableString } from './_i18n/TranslatableString';

import controller, { load } from './_i18n/requireJsPlugin';

export { load, controller };
