/// <amd-module name="I18n/_i18n/i18n" />
// @ts-ignore
import { constants, IoC} from 'Env/Env';
import RkString from './RkString';
import 'Core/polyfill';

const PLURAL_PREFIX = 'plural#';
const CONTEXT_SEPARATOR = '@@';
const PLURAL_DELIMITER = '|';

/** Все загруженные словари, где ключ - слово на языке оригинала */
const dictionary = {};
/** Все загруженные словари, где ключ - имя словаря */
const dictionaryNames = {};

const global = (function(): ExtWindow {
   return this || (0, eval)('this');
})();

let localizationEnabled = constants.isServerScript ?
   false :
   (constants.isNodePlatform ?
      true :
      (global.contents ?
         !!global.contents.defaultLanguage :
         constants.i18n
      )
   );

/**
 * I18n - поддержка интернационализации. Подробнее о механизме интернационализации читайте в разделе <a href="https://wi.sbis.ru/doc/platform/developmentapl/internalization/">Интернационализация и локализация</a>.
 * @class Core/i18n
 * @author Aleksey Maltsev.
 * @public
 * @singleton
 */

class I18n {
   /** Текущий язык */
   private _language: string;
   /** Язык по-умолчанию */
   private _defaultLanguage: string;
   /** Список поддерживаемых языков */
   private _availableLanguage: Object;

   construct(config) {
      this.rk = this.rk.bind(this);

      /** Текущий язык */
      this._language = config.languge || '';
      /** Язык по-умолчанию */
      this._defaultLanguage = config.defaultLanguage || 'ru-RU';
      /** Список поддерживаемых языков */
      this._availableLanguage = config.availableLanguage || {};
   }

   /**
    * Возвращает признак: включена ли локализация для текущего приложения.
    * @return {Boolean}
    * @see setEnable
    */
   static isEnabled() {
      return localizationEnabled;
   }

   /**
    * Возвращает кодовое обозначение локали того языка, на который локализована данная страница веб-приложения.
    * @returns {String} <a href="/doc/platform/developmentapl/internalization/locale/">Кодовое обозначение локали</a>.
    * Например, "ru-RU" или "en-US".
    */
   getLocale() {
      return this._language;
   }

   protected _translate(key, ctx, num) {
      /**
       * Если отдали НЕ строку, или того кто ей "притворяется"
       * то выходим и не переводим
       */
      if (key === null || key === undefined || !key.indexOf) {
         return key;
      }

      let retValue = key;
      let lang = '';
      const index = key.indexOf(CONTEXT_SEPARATOR);
      if (index > -1) {
         ctx = key.substr(0, index);
         key = key.substr(index + CONTEXT_SEPARATOR.length);
      }
      if (typeof ctx === 'number') {
         num = ctx;
         ctx = '';
      }

      retValue = key;
      if (I18n.isEnabled()) {
         lang = this.getLocale();
         if (lang && dictionary[lang]) {
            if (num !== undefined) {
               const trans_key = this._getTransKey(PLURAL_PREFIX + key, ctx, lang);
               retValue = trans_key ? this._plural(trans_key, num) : key;
            } else {
               retValue = this._getTransKey(key, ctx, lang) || key;
            }
         }
      }

      return retValue;
   }

   /**
    * Возвращает переведенное значение ключа.
    * @param {String} key Ключ локализации.
    * @param {String|Number} [ctx] <a href="/doc/platform/developmentapl/internalization/context/">Контекст перевода</a>.
    * Когда аргумент принимает число, то это трактуется как значение, под которое нужно подобрать множественную форму перевода слова (см. <a href="/doc/platform/developmentapl/internalization/javascript-localization/#word-case-by-number">Склонение слова в зависимости от числа</a>).
    * @param {Number} [num] Число, под которое нужно подобрать множественную форму перевода слова (см. <a href="/doc/platform/developmentapl/internalization/javascript-localization/#word-case-by-number">Склонение слова в зависимости от числа</a>).
    * @returns {String}
    * @public
    */
   rk(key, ctx, num) {
      if (key instanceof RkString) {
         return key;
      }

      if (typeof window !== 'undefined' || key === null || key === undefined || !key.indexOf) {
         return this._translate(key, ctx, num);
      }

      return new RkString(key, (() => this._translate(key, ctx, num)));
   }

   protected _getTransKey(key, ctx, lang) {
      const trans_key = dictionary[lang][ctx ? `${ctx}${CONTEXT_SEPARATOR}${key}` : `${key}`];
      if (trans_key !== undefined) {
         return trans_key;
      }

      // Проверим, что включен НЕ русский язык, мы на клиенте и где-то где в адресе есть дефис - так
      // определим что мы не на бою
      if (lang !== 'ru-RU' && typeof window !== 'undefined' &&
         window.location.host.indexOf('-') > -1) {
         // Если в ключе есть русские буквы, значит нужно поругаться,
         // иначе это может быть пробел или символ из шаблона
         if (/[А-Яа-яA-Za-z]+/.test(key)) {
            IoC.resolve('ILogger').error('Localization', `Для ключа ${key} отсутствует перевод в словаре.`);
         }
      }

      return undefined;
   }

   /**
    * Проверят наличие словаря по его имени.
    * @param {String} dictName Имя словаря.
    * @param {String} [lang=this.getLocale()]
    * @returns {boolean}
    * @see setDict
    * @see getDictPath
    */
   hasDict(dictName, lang) {
      lang = lang || this.getLocale();
      return dictionaryNames[lang] ? dictName in dictionaryNames[lang] : false;
   }

   /**
    * Вставляет новый словарь
    * @param {Object} dict.
    * @param {String} name.
    * @param {String} [lang=this.getLocale()]
    * @see hasDict
    * @see getDictPath
    */
   setDict(dict, name, lang) {
      lang = lang || this.getLocale();
      if (lang && !this.hasDict(name, lang)) {
         if (name) {
            dictionaryNames[lang] = dictionaryNames[lang] || {};
            dictionaryNames[lang][name] = true;
         }

         dictionary[lang] = Object.assign(dictionary[lang] || {}, dict);
      }
   }

   protected _plural(str, num) {
      if (str !== undefined) {
         num = Math.abs(num);
         let lang = this.getLocale(),
            arg;
         arg = [num].concat(str.split(PLURAL_DELIMITER));
         switch (lang) {
            case 'en-US':
               return this._pluralEn.apply(this, arg);
            case 'ru-RU':
               return this._pluralRu.apply(this, arg);
            default:
               return str;
         }
      }

      return undefined;
   }

   protected _pluralRu(num, word1, word2, word3, word4) {
      // если есть дробная часть
      if (num % 1 > 0) {
         return word4;
      }

      // если две последние цифры 11 ... 19
      num = num % 100;
      if (num >= 11 && num <= 19) {
         return word3;
      }

      // все остальные случаи - по последней цифре
      num = num % 10;

      if (num == 1) {
         return word1;
      }

      if (num == 2 || num == 3 || num == 4) {
         return word2;
      }
      return word3;
   }

   /**
    * Для английской локали
    * @param num число
    * @param word1 слово для 1
    * @param word2 слово для нескольких
    * @returns {String}
    * @private
    */
   protected _pluralEn(num, word1, word2) {
      if (num > 1 || num === 0) {
         return word2;
      }
      return word1;
   }
}

export default I18n;
