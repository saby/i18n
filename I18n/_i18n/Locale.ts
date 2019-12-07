import RkString from './RkString';
import IConfiguration from './IConfiguration';
import {IoC} from 'Env/Env';
import constants from './Const';

/** Все загруженные словари, где ключ - слово на языке оригинала */
const dictionary = {};

/** Все загруженные словари, где ключ - имя словаря */
const dictionaryNames = {};

/**
 * Класс локали.
 * @class I18n/_i18n/Locale
 * @author Кудрявцев И.С.
 * @public
 */

class Locale {

   /** Конфигурация локали */
   private config: IConfiguration = null;

   constructor(config: IConfiguration) {

      /** Конфигурация локали */
      this.config = config;
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
   rk(key: string, context?: string | number, pluralNumber?: number): any {
      if (typeof key === 'string') {
         if (constants.isBrowser) {
            return this._translate(key, context, pluralNumber);
         } else {
            return new RkString(key, (() => this._translate(key, context, pluralNumber)));
         }
      } else {
         return key;
      }
   }

   protected _translate(key: string, context?: string | number, pluralNumber?: number): string {
      const index = key.indexOf(constants.contextSeparator);

      if (index > -1) {
         context = key.substr(0, index);
         key = key.substr(index + constants.contextSeparator.length);
      }

      if (typeof context === 'number') {
         pluralNumber = context;
         context = '';
      }

      let result = key;
      if (dictionary[this.config.code]) {
         if (pluralNumber !== undefined) {
            const translatedKey = this._translateKey( constants.pluralPrefix + key, context);
            result = translatedKey ? this._translatePlural(translatedKey, pluralNumber) : key;

            if (!result) {
               IoC.resolve('ILogger').error(
                  'Localization',
                  `Для ключа ${key} нет плюральной формы числа ${pluralNumber} в локали ${this.config.code}.`
               );
            }
         } else {
            result = this._translateKey(key, context) || key;
         }
      }

      return result || key;
   }

   protected _translateKey(key: string, context?: string): string {
      const contextKey = context ? `${context}${constants.contextSeparator}${key}` : `${key}`;
      const translatedKey = dictionary[this.config.code][contextKey];

      return translatedKey !== undefined ? translatedKey : '';
   }

   protected _translatePlural(key: string, pluralNumber: number): string {
      return this.config.plural(Math.abs(pluralNumber), ...key.split(constants.pluralDelimiter));
   }

   /**
    * Проверят наличие словаря по его имени.
    * @param {String} dictName Имя словаря.
    * @param {String} locale Имя локали.
    * @returns {Boolean}
    */
   static hasDictionary(dictName: string, locale: string): boolean {
      return dictionaryNames[locale] ? dictName in dictionaryNames[locale] : false;
   }

   /**
    * Вставляет новый словарь.
    * @param {Object} dict. Словарь
    * @param {String} name Имя словаря.
    * @param {String} locale Имя локали.
    * @see hasDict
    */
   static setDictionary(dict: object, name: string, locale: string): void {
      if (locale && !Locale.hasDictionary(name, locale)) {
         if (name) {
            dictionaryNames[locale] = dictionaryNames[locale] || {};
            dictionaryNames[locale][name] = true;
         }

         dictionary[locale] = {...dictionary[locale], ...dict};
      }
   }

   /**
    * Возврашает все установленные словари.
    */
   static settedDictionaries(): object {
      return dictionaryNames;
   }
}

export default Locale;
