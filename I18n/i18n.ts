/**
 * Библиотека для работы с локализацией.
 * @module
 * @library I18n/i18n
 * @includes Translator I18n/_i18n/Translator
 * @includes Loader I18n/_i18n/Loader
 * @includes controller I18n/_i18n/Controller
 * @includes TranslatableString I18n/_i18n/TranslatableString
 * @public
 * @author Кудрявцев И.С.
 */

/*
    Магический импорт, чтобы в плагине Require.js "i18n!" инцилизировать controller и загрузить нужный конфиг локали.
    Плагин единственная асинхронная точка в процессе загрузки модулей, когда мы можем подгрузить
    конфигурацию локали и словари.
 */
import 'i18n!controller?';

/*
    Пришлось создать дополнительную библиотеку, содержащую в себе плагин "i18n!" и все его зависимости,
    чтобы разорвать цикл, который образуется из-за импорта выше.
 */
export { Translator, Loader, controller, Controller, TranslatableString } from 'I18n/singletonI18n';
