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
