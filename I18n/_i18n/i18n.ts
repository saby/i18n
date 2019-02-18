/// <amd-module name="I18n/_i18n/i18n" />
// @ts-ignore
import { constants, IoC} from 'Env/Env';
import RkString from './RkString';
import 'Core/polyfill';

const PLURAL_PREFIX = 'plural#';
const CONTEXT_SEPARATOR = '@@';
const PLURAL_DELIMITER = '|';
const IS_BROWSER = typeof window !== 'undefined';

/** Все загруженные словари, где ключ - слово на языке оригинала */
const dictionary = {};
/** Все загруженные словари, где ключ - имя словаря */
const dictionaryNames = {};

/**
 * I18n - поддержка интернационализации. Подробнее о механизме интернационализации читайте в разделе <a href="https://wi.sbis.ru/doc/platform/developmentapl/internalization/">Интернационализация и локализация</a>.
 * @class Core/i18n
 * @author Aleksey Maltsev.
 * @public
 * @singleton
 */

class I18n {
   /** Текущий язык */
   private _locale: string;
   /** Язык по-умолчанию */
   private _defaultLanguage: string;
   /** Список поддерживаемых языков */
   private _availableLanguage: Object;
    /** Функция для плюралной формы */
   private _plural: Function;

   construct(config) {
      this.rk = this.rk.bind(this);

      /** Текущий язык */
      this._locale = config.languge || '';
      /** Язык по-умолчанию */
      this._defaultLanguage = config.defaultLanguage || 'ru-RU';
      /** Список поддерживаемых языков */
      this._availableLanguage = config.availableLanguage || {};
      /** Функция для плюралной формы */
      this._plural = config.plural
   }

    /**
     * Возвращает переведенное значение ключа.
     * @param {String} key Ключ локализации.
     * @param {String|Number} context Контекст перевода.
     * Когда аргумент принимает число, то это трактуется как значение,
     * под которое нужно подобрать множественную форму перевода слова
     * @param {Number} pluralNumber Число, под которое нужно подобрать множественную форму перевода слова.
     * @returns {String}
     * @public
     */
    rk(key, context, pluralNumber) {
       if (typeof key === 'string') {
          if (IS_BROWSER) {
             return this._translate(key, context, pluralNumber)
          } else {
             return new RkString(key, (() => this._translate(key, context, pluralNumber)))
          }
       } else {
          return key;
       }
    }

   protected _translate(key, context, pluralNumber) {
      const index = key.indexOf(CONTEXT_SEPARATOR);

      if (index > -1) {
         context = key.substr(0, index);
         key = key.substr(index + CONTEXT_SEPARATOR.length);
      }

      if (typeof context === 'number') {
         pluralNumber = context;
         context = '';
      }

      let result = key;
      if (dictionary[this._locale]) {
         if (pluralNumber !== undefined) {
            const translatedKey = this._getTranslateKey(PLURAL_PREFIX + key, context);
            result = translatedKey ? this._translatePlural(translatedKey, pluralNumber) : key;
         } else {
            result = this._getTranslateKey(key, context) || key;
         }
      }

      return result;
   }

   protected _getTranslateKey(key, context) {
      const translatedKey = dictionary[this._locale][context ? `${context}${CONTEXT_SEPARATOR}${key}` : `${key}`];

      return translatedKey !== undefined ? translatedKey : undefined;
   }

    protected _translatePlural(str, num) {
        if (str !== undefined) {
            return this._plural.apply(this, [Math.abs(num)].concat(str.split(PLURAL_DELIMITER)));
        }

        return undefined;
    }

   /**
    * Проверят наличие словаря по его имени.
    * @param {String} dictName Имя словаря.
    * @param {String} locale Имя локали.
    * @returns {Boolean}
    */
   static hasDict(dictName, locale) {
      return dictionaryNames[locale] ? dictName in dictionaryNames[locale] : false;
   }

   /**
    * Вставляет новый словарь.
    * @param {Object} dict. Словарь
    * @param {String} name Имя словаря.
    * @param {String} locale Имя локали.
    * @see hasDict
    */
   static setDict(dict, name, locale) {
      if (locale && !I18n.hasDict(name, locale)) {
         if (name) {
            dictionaryNames[locale] = dictionaryNames[locale] || {};
            dictionaryNames[locale][name] = true;
         }

         dictionary[locale] = Object.assign(dictionary[locale] || {}, dict);
      }
   }
}

export default I18n;
