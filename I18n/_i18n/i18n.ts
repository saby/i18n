/// <amd-module name="I18n/_i18n/i18n" />
// @ts-ignore
import constants = require('Core/constants');
// @ts-ignore
import IoC = require('Core/IoC');
// @ts-ignore
import cookie = require('Core/cookie');
import RkString from './RkString';

const availableLanguage = {
   "ru-RU": "Русский (Россия)",
   "en-US": "English (USA)"
};

let global = (function () {
      return this || (0, eval)('this');// eslint-disable-line no-eval
   }()),
   localizationEnabled = constants.isServerScript ? false :
      constants.isNodePlatform ? true : global.contents ? !!global.contents.defaultLanguage : constants.i18n,
   PLURAL_PREFIX = 'plural#',
   PLURAL_DELIMITER = '|',
   EXPIRES_COOKIES = 2920;

/**
 * I18n - поддержка интернационализации. Подробнее о механизме интернационализации читайте в разделе <a href="https://wi.sbis.ru/doc/platform/developmentapl/internalization/">Интернационализация и локализация</a>.
 * @class Core/i18n
 * @author Aleksey Maltsev.
 * @public
 * @singleton
 */

class I18n {
   /** Разделитель между контекстом и ключом */
   private _separator: string;
   /** Текущий язык */
   private _currentLang: string;
   /** Все загруженные словари, где ключ - слово на языке оригинала */
   private _dict: Object;
   /** Все загруженные словари, где ключ - имя словаря */
   private _dictNames: Object;

   construct() {
      this.rk = this.rk.bind(this);
      this.init();

      /** Разделитель между контекстом и ключом */
      this._separator = '@@';
      /** Текущий язык */
      this._currentLang = '';
      /** Все загруженные словари, где ключ - слово на языке оригинала */
      this._dict = {};
      /** Все загруженные словари, где ключ - имя словаря */
      this._dictNames = {};
   }
   /**
    * Инициализация синглтона
    */
   init() {
      if (localizationEnabled) {
         // Теперь определим текущий язык
         this.setLocale(this.detectLanguage());
      } else {
         this.setLocale('');
      }

      // Чтобы функция rk всегда была
      // На ПП она своя
      if (!global.hasOwnProperty('rk')) {
         global.rk = this.rk.bind(this);
      }
   }

   /**
    * Возвращает признак: включена ли локализация для текущего приложения.
    * @return {Boolean}
    * @see setEnable
    */
   isEnabled() {
      return localizationEnabled;
   }

   /**
    * Включает механизм локализации для текущего приложения.
    * @param {Boolean} enable
    * @see isEnabled
    */
   setEnabled(enable) {
      localizationEnabled = enable;
      this.init();
   }

   /**
    * Возвращает кодовое обозначение локали того языка, на который локализована данная страница веб-приложения.
    */
   detectLanguage() {
      if (constants.isNodePlatform) {
         let detectedLng = constants.defaultLanguage;
         const request = process.domain && process.domain.req;

         if (request) {
            const queryLang = request.query && request.query.lang;
            const respond = process.domain.res;

            detectedLng = queryLang || cookie.get('lang') || detectedLng;
            detectedLng = this.hasLang(detectedLng) ? detectedLng : constants.defaultLanguage;

            if (respond && !(respond.cookies && respond.cookies.hasOwnProperty('lang')) && queryLang) {
               cookie.set('lang', detectedLng, {
                   expires: EXPIRES_COOKIES,
                   path: '/'
               });
               const redirectUrl = request.path + this._getUrlWithoutParam(request.query, 'lang');
               respond.redirect(redirectUrl);
            }
         }
         return detectedLng;
      }
      if (localizationEnabled) {
         const avLang = this.getAvailableLang();
         let detectedLng = cookie.get('lang') || '';

         if (!detectedLng) {
            detectedLng = constants.defaultLanguage || (global.contents && global.contents.defaultLanguage);
         }

         // Если уже ничто не помогло, Возьмем первый язык из доступных
         if (!detectedLng || detectedLng.length !== 5 || !avLang[detectedLng]) {
            detectedLng = Object.keys(avLang)[0] || '';
         }

         return detectedLng;
      }

      return '';
   }

   /**
    * Возвращает кодовое обозначение локали того языка, на который локализована данная страница веб-приложения.
    * @returns {String} <a href="/doc/platform/developmentapl/internalization/locale/">Кодовое обозначение локали</a>.
    * Например, "ru-RU" или "en-US".
    * @see detectLanguage
    * @see getAvailableLang
    * @see hasLang
    * @see setLocale
    */
   getLocale() {
      if (constants.isServerScript) {
         return '';
      }
      if (constants.isNodePlatform) {
         return this.detectLanguage();
      }
      if (localizationEnabled) {
         return this._currentLang;
      }
      return '';
   }

   /**
    * Возвращает список языков, на которые может быть локализовано веб-приложение.
    * @returns {Object} Ключ - <a href="/doc/platform/developmentapl/internalization/locale/">кодовое обозначение локали</a>, значение - текстовая расшифровка локали.
    * @example
    * <pre>
    * {
    *    ru-RU: "Русский (Россия)",
    *    en-US: "English (USA)"
    * }
    * </pre>
    * @see detectLanguage
    * @see getLocale
    * @see hasLang
    * @see setLocale
    */
   getAvailableLang() {
      return availableLanguage;
   }

   /**
    * Возвращает признак: может ли веб-приложение локализовано на указанный язык.
    * @param {String} language <a href="/doc/platform/developmentapl/internalization/locale/">Кодовое обозначение локали</a>.
    * @returns {Boolean}
    * @see getAvailableLang
    * @see detectLanguage
    * @see getLocale
    * @see setLocale
    */
   hasLang(language) {
      return language in availableLanguage;
   }

   /**
    * Устанавливает язык, на который будут переводиться значения.
    * @param {String} language Двухбуквенное название языка.
    * @returns {boolean}
    */
   setLocale(language) {
      if (constants.isServerScript || constants.isNodePlatform) {
         return false;
      }

      if (localizationEnabled) {
         let changeLang = false,
            oldLang = this._currentLang,
            currentLang;

         if (language && typeof (language) === 'string' && /..-../.test(language) && language !== this._currentLang) {
            const parts = language.split('-');
            this._currentLang = `${parts[0].toLowerCase()}-${parts[1].toUpperCase()}`;
            changeLang = true;
         }

         if (!language) {
            this._currentLang = '';
            changeLang = true;
         }

         if (changeLang) {
            cookie.set('lang', this._currentLang || null, {
               expires: EXPIRES_COOKIES,
               path: '/'
            });

         }

         return changeLang;
      }

      cookie.set('lang', null, {
         path: '/'
      });


      return false;
   }

   _translate(key, ctx, num) {
      /**
       * Если отдали НЕ строку, или не того кто ей "прикитворяется"
       * то выходим и не переводим
       */
      if (key === null || key === undefined || !key.indexOf) {
         return key;
      }

      let retValue = key;
      let lang = '';
      const index = key.indexOf(this._separator);
      if (index > -1) {
         ctx = key.substr(0, index);
         key = key.substr(index + this._separator.length);
      }
      if (typeof ctx === 'number') {
         num = ctx;
         ctx = '';
      }

      retValue = key;
      if (!constants.isServerScript && (constants.isNodePlatform || localizationEnabled)) {
         lang = this.getLocale();
         if (lang && this._dict[lang]) {
            if (num !== undefined) {
               const trans_key = this._getTransKey(PLURAL_PREFIX + key, ctx, lang);
               retValue = trans_key ? this._plural(trans_key, num) : key;
            } else {
               retValue = this._getTransKey(key, ctx, lang) || key;
            }
         }
      }

      // Простое экранирование
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
   _getTransKey(key, ctx, lang) {
      const trans_key = this._dict[lang][ctx ? `${ctx}${this._separator}${key}` : `${key}`];
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
      return this._dictNames[lang] ? dictName in this._dictNames[lang] : false;
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
            this._dictNames[lang] = this._dictNames[lang] || {};
            this._dictNames[lang][name] = true;
         }

         this._dict[lang] = Object.assign(this._dict[lang] || {}, dict);
      }
   }

   _plural(str, num) {
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
   _pluralRu(num, word1, word2, word3, word4) {
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
   _pluralEn(num, word1, word2) {
      if (num > 1 || num === 0) {
         return word2;
      }
      return word1;
   }


    /**
     * Возращает массив параметров строкой в формате URL, исключая указаный параметр.
     * Пример: '?param1=value1&param2=value2'
     * @param qeury {Array} Массив параметров запроса.
     * @param deleteParam {String} Имя исключаемого параметра.
     * @returns {String}
     */
   _getUrlWithoutParam(qeury, deleteParam) {
      if (Object.keys(qeury).length === 0 || Object.keys(qeury).length === 1 && qeury.hasOwnProperty(deleteParam)) {
         return '';
      }

      let result = '?';

      for (const name in qeury) {
         if (name !== deleteParam) {
            result += name + '=' + qeury[name] + '&';
         }
      }

      return result.slice(0, result.length - 1);
   }
}

let i18n = new I18n();
let rk = i18n.rk.bind(i18n);

rk.setLocale = i18n.setLocale.bind(i18n);
rk.getLocale = i18n.getLocale.bind(i18n);
rk.setDict = i18n.setDict.bind(i18n);
rk.hasDict = i18n.hasDict.bind(i18n);
rk.isEnabled = i18n.isEnabled.bind(i18n);
rk.setEnabled = i18n.setEnabled.bind(i18n);


export default rk;
