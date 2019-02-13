/// <amd-module name="I18n/_i18n/i18n" />
// @ts-ignore
import { constants } from 'Env/Env';
// @ts-ignore
import { IoC } from 'Env/Env';
// @ts-ignore
import { cookie } from 'Env/Env';
import RkString from './RkString';
import loadMetaInfo from './loadMetaInfo';
import cutParameterFromURL from './cutParameterFromURL';
import 'Core/polyfill';

const PLURAL_PREFIX = 'plural#';
const CONTEXT_SEPARATOR = '@@';
const PLURAL_DELIMITER = '|';
const EXPIRES_COOKIES = 2920;

/** Все загруженные словари, где ключ - слово на языке оригинала */
const dictionary = {};
/** Все загруженные словари, где ключ - имя словаря */
const dictionaryNames = {};
/** Всe загруженная иформация о локализации интерфейсных модулей */
const modulesInfo = {};

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
   private _currentLang: string;
   /** Язык по-умолчанию */
   private defaultLanguage: string;
   /** Список поддерживаемых языков */
   private availableLanguage: Object;

   construct(config) {
      this.rk = this.rk.bind(this);

      /** Текущий язык */
      this._currentLang = '';
      /** Язык по-умолчанию */
      this.defaultLanguage = config.defaultLanguage || 'ru-RU';
      /** Список поддерживаемых языков */
      this.availableLanguage = config.availableLanguage || {};

      this.setLocale(this.detectLanguage());
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
    * Включает механизм локализации для текущего приложения.
    * @param {Boolean} enable
    * @see isEnabled
    */
   setEnabled(enable) {
      localizationEnabled = enable;
      this.setLocale(this.detectLanguage());
   }

   /**
    * Возвращает кодовое обозначение локали того языка, на который локализована данная страница веб-приложения.
    */
   detectLanguage() {
      if (constants.isNodePlatform) {
         let detectedLang = this.defaultLanguage;
         const request = process.domain && process.domain.req;

         if (request) {
            const reqCookie = cookie.get('lang');
            const queryLang = request.query && request.query.lang;

            detectedLang = queryLang || reqCookie || this._detectLanguageBrowser(request);
            detectedLang = this.hasLang(detectedLang) ? detectedLang : this.defaultLanguage;

            if (queryLang || !reqCookie) {
               this._setLocalOnNodeJS(detectedLang, process.domain);
            }
         }

         return detectedLang;
      }

      if (I18n.isEnabled()) {
         const avLang = this.availableLanguage;
         let detectedLang = cookie.get('lang') || '';

         if (!detectedLang) {
            detectedLang = this.defaultLanguage;
         }

         // Если уже ничто не помогло, Возьмем первый язык из доступных
         if (!detectedLang || detectedLang.length !== 5 || !avLang[detectedLang]) {
            detectedLang = Object.keys(avLang)[0] || '';
         }

         return detectedLang;
      }

      return '';
   }

   /**
    * Функция опрделения языка из настройки браузера.
    */
   protected _detectLanguageBrowser(request) {
      let detectedLang = this.defaultLanguage;
      const acceptLang = request && request.headers && request.headers['accept-language']
          && request.headers['accept-language'].split(',');

      if (acceptLang) {
         acceptLang.some(langHeader => {
            const lang = langHeader.split(';')[0];

            if (lang.includes('-') && this.hasLang(lang)) {
               detectedLang = lang;
               return true;
            } else if (!lang.includes('-')) {
               for (const locale in this.availableLanguage) {
                  if (locale.startsWith(lang)) {
                     detectedLang = locale;
                     return true;
                  }
               }
            }
         });
      }

      return detectedLang;
   }

   /**
    * Возвращает кодовое обозначение локали того языка, на который локализована данная страница веб-приложения.
    * @returns {String} <a href="/doc/platform/developmentapl/internalization/locale/">Кодовое обозначение локали</a>.
    * Например, "ru-RU" или "en-US".
    * @see detectLanguage
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
      if (I18n.isEnabled()) {
         return this._currentLang;
      }
      return '';
   }

   /**
    * Возвращает признак: может ли веб-приложение локализовано на указанный язык.
    * @param {String} language <a href="/doc/platform/developmentapl/internalization/locale/">Кодовое обозначение локали</a>.
    * @returns {Boolean}
    * @see detectLanguage
    * @see getLocale
    * @see setLocale
    */
   hasLang(language) {
      return language in this.availableLanguage;
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

      if (I18n.isEnabled()) {
         let changeLang = false

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

      return false;
   }

   /**
    * Переключает язык на сервисе представлений.
    * @param lang
    */
   protected _setLocalOnNodeJS(lang, domain) {
      const request = domain && domain.req;
      const respond = domain && domain.res;

      if (request && respond && !(respond.cookies && respond.cookies.hasOwnProperty('lang'))) {
         this._currentLang = lang;

         cookie.set('lang', this._currentLang, {
            expires: EXPIRES_COOKIES,
            path: '/'
         });

         respond.redirect(request.originalUrl + cutParameterFromURL(request.query, 'lang'));
      }
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
    * Функция проверяет, что интерфейсный модуль ещё не обрабатывается.
    * @param nameModule - имя интерфейсного модуля.
    * @returns {Boolean}
    */
   static isProcessedModule(nameModule) {
      return modulesInfo.hasOwnProperty(nameModule);
   }

   /**
    * Метод возращает информацию о словарях поддерживаемых интерфейсным модулем.
    * @param nameModule - имя интерфейсного модуля
    * @param loader - имя интерфейсного модуля
    * @returns {Deferred}
    * @see isProcessedModule
    */
   static getLocalizationInfoToModule(nameModule, loader) {
      if (I18n.isProcessedModule(nameModule)) {
         return modulesInfo[nameModule];
      }

      modulesInfo[nameModule] = loadMetaInfo(nameModule, loader);

      return modulesInfo[nameModule];
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
