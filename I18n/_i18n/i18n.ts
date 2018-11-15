// @ts-ignore
import constants = require('Core/constants');
// @ts-ignore
import pathResolver = require('Core/pathResolver');
// @ts-ignore
import IoC = require('Core/IoC');
// @ts-ignore
import cookie = require('Core/cookie');

const availableLanguage = {
   "ru-RU": "Русский (Россия)",
   "en-US": "English (USA)"
}

let global = (function () {
      return this || (0, eval)('this');// eslint-disable-line no-eval
   }()),
   localizationEnabled = constants.isServerScript ? false :
      constants.isNodePlatform ? true : global.contents ? !!global.contents.defaultLanguage : constants.i18n,
   directoryRegexp = /(.*\/)?(resources\/(.+?)|ws)\//,
   dblSlashes = /\\/g,
   i18n,
   PLURAL_PREFIX = 'plural#',
   PLURAL_DELIMITER = '|',
   EXPIRES_COOKIES = 2920;


const RkString = function RkString(value, resolver) {
   Object.defineProperties(this, {
      translatedValue: {
         enumerable: true,
         get() {
            return String(resolver(value) || value);
         }
      },
      length: {
         enumerable: true,
         get() {
            return this.translatedValue.length;
         }
      }
   });
};

RkString.prototype = Object.create(String.prototype);

RkString.prototype.toString = RkString.prototype.toJSON = RkString.prototype.valueOf = function () {
   return this.translatedValue;
};


/**
 * Самый простой мерж, мы знаем, что всегда мержим объекты
 * @param {Object} to
 * @param {Object} from
 */
function merge(to, from) {
   for (const i in from) {
      if (from.hasOwnProperty(i) && !to[i]) {
         to[i] = from[i];
      }
   }

   return to;
}


/**
 * Функция возращает сторку c параметрами в формате URL.
 * Пример: '?param1=value1&param2=value2'
 * @param qeury {Array} Массив параметорв запроса.
 * @param deleteParam {String} Имя парметра которое надо исключить.
 * @returns {string}
 */
function getUrlWithoutParam(qeury, deleteParam) {
   if (Object.keys(qeury).length === 0 || Object.keys(qeury).length === 1 && qeury.hasOwnProperty(deleteParam)) {
      return '';
   }

   var result = '?';

   for (var name in qeury) {
      if (name !== deleteParam) {
         result += name + '=' + qeury[name] + '&';
      }
   }

   return result.slice(0, result.length - 1);
}

/**
 * Уставливает язык.
 * Устанавливаем rk
 */
function init() {
   if (localizationEnabled) {
      // Теперь определим текущий язык
      i18n.setLang(i18n.detectLanguage());
   } else {
      i18n.setLang('');
   }

   // Чтобы функция rk всегда была
   // На ПП она своя
   if (!global.hasOwnProperty('rk')) {
      global.rk = i18n.rk.bind(i18n);
   }
}

/**
 * i18n - поддержка интернационализации. Подробнее о механизме интернационализации читайте в разделе <a href="https://wi.sbis.ru/doc/platform/developmentapl/internalization/">Интернационализация и локализация</a>.
 * @class Core/i18n
 * @author Aleksey Maltsev.
 * @public
 * @singleton
 */
i18n = /** @lends Core/i18n.prototype */{
   /**
    * Инициализация синглтона
    */
   init() {
      if (this.isInit()) {
         return;
      }

      this.__init = true;
      init();
   },

   /**
    * Возвращает признак инициализации.
    * @return {boolean}
    */
   isInit() {
      return !!this.__init;
   },

   /**
    * Возвращает признак: включена ли локализация для текущего приложения.
    * @return {Boolean}
    * @see setEnable
    */
   isEnabled() {
      return localizationEnabled;
   },

   /**
    * Включает механизм локализации для текущего приложения.
    * @param {Boolean} enable
    * @see isEnabled
    */
   setEnable(enable) {
      localizationEnabled = enable;
      init();
   },

   /**
    * Возвращает кодовое обозначение локали того языка, на который локализована данная страница веб-приложения.
    * @deprecated Используйте метод {@link getLang}.
    */
   detectLanguage() {
      if (constants.isServerScript) {
         return '';
      }
      if (constants.isNodePlatform) {
         // <editor-fold desc="TODO">
         // TODO: Когда все сайты будут с локализацией, корректное определение языка будет такое:
         // var req = process.domain && process.domain.req,
         //     cookie = req && req.cookies,
         //     acceptLanguage = req && req.headers && req.headers['accept-language']
         //       && req.headers['accept-language'].substr(0, 5),
         //     lang = (cookie && cookie.lang) ||
         //       (acceptLanguage && langReg.test(acceptLanguage) && acceptLanguage) || '';
         //
         // if (cookie) {
         //    cookie.lang = lang;
         // }
         // return lang;
         // </editor-fold>
         // Мы на препроцессоре, язык попробуем определить из куки

         let detectedLng = constants.defaultLanguage;
         const request = process.domain && process.domain.req;

         if (request) {
            const reqCookie = request.cookies.lang;
            const queryLang = request.query.lang;

            detectedLng = queryLang || reqCookie || detectedLng;
            detectedLng = this.hasLang(detectedLng) ? detectedLng : this.getDefaultLang();

            if (!(process.domain.res.cookies && process.domain.res.cookies.hasOwnProperty('lang')) && queryLang) {
               cookie.set('lang', detectedLng, {
                  expires: EXPIRES_COOKIES,
                  path: '/'
               });

               const redirectUrl = request.path + getUrlWithoutParam(request.query, 'lang');

               process.domain.res.redirect(redirectUrl);
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
   },

   /**
    * Возращает кодовое значение языка по умолчанию.
    * @returns {String} <a href="/doc/platform/developmentapl/internalization/locale/">Кодовое обозначение локали</a>.
    * @see detectLanguage
    */
   getDefaultLang() {
      return constants.defaultLanguage || 'ru-RU';
   },

   /**
    * Возвращает кодовое обозначение локали того языка, на который локализована данная страница веб-приложения.
    * @returns {String} <a href="/doc/platform/developmentapl/internalization/locale/">Кодовое обозначение локали</a>.
    * Например, "ru-RU" или "en-US".
    * @see detectLanguage
    * @see getAvailableLang
    * @see hasLang
    * @see setLang
    */
   getLang() {
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
   },

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
    * @see getLang
    * @see hasLang
    * @see setLang
    */
   getAvailableLang() {
      return availableLanguage;
   },

   /**
    * Возвращает признак: может ли веб-приложение локализовано на указанный язык.
    * @param {String} language <a href="/doc/platform/developmentapl/internalization/locale/">Кодовое обозначение локали</a>.
    * @returns {Boolean}
    * @see getAvailableLang
    * @see detectLanguage
    * @see getLang
    * @see setLang
    */
   hasLang(language) {
      return language in availableLanguage;
   },

   /**
    * Устанавливает язык, на который будут переводиться значения.
    * @param {String} language Двухбуквенное название языка.
    * @returns {boolean}
    */
   setLang(language) {
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

            currentLang = this._currentLang;
            document.addEventListener('DOMContentLoaded', () => {
               if (document.body.classList.length && oldLang) {
                  document.body.classList.remove(oldLang);
               }
               document.body.classList.add(currentLang);
            });
         }

         return changeLang;
      }

      cookie.set('lang', null, {
         path: '/'
      });

      document.addEventListener('DOMContentLoaded', () => {
         if (document.body.classList.length && this._currentLang) {
            document.body.classList.remove(this._currentLang);
         }
      });


      return false;
   },

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
         lang = this.getLang();
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
   },

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
      if (typeof window !== 'undefined' || key === null || key === undefined || !key.indexOf) {
         return this._translate(key, ctx, num);
      }

      return new RkString(key, (() => this._translate(key, ctx, num)));
   },
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
   },

   /**
    * Проверят наличие словаря по его имени.
    * @param {String} dictName Имя словаря.
    * @param {String} [lang=this.getLang()]
    * @returns {boolean}
    * @see setDict
    * @see getDictPath
    */
   hasDict(dictName, lang) {
      lang = lang || this.getLang();
      return this._dictNames[lang] ? dictName in this._dictNames[lang] : false;
   },

   /**
    * Вставляет новый словарь
    * @param {Object} dict.
    * @param {String} name.
    * @param {String} [lang=this.getLang()]
    * @see hasDict
    * @see getDictPath
    */
   setDict(dict, name, lang) {
      lang = lang || this.getLang();
      if (lang && !this.hasDict(name, lang)) {
         if (name) {
            this._dictNames[lang] = this._dictNames[lang] || {};
            this._dictNames[lang][name] = true;
         }

         this._dict[lang] = merge(this._dict[lang] || {}, dict);
      }
   },

   /**
    * Отдает путь до словаря по имени модуля.
    * @param {String} moduleName
    * @param {String} lang
    * @param {String} ext
    * @return {String}
    * @see hasDict
    * @see setDict
    */
   getDictPath(moduleName, lang, ext) {
      let
         modulePath = pathResolver.resolveComponentPath(moduleName),
         matched,
         firstLevelDir,
         dictPath,
         dictionary;

      dictionary = constants.dictionary || {};
      if (Object.keys(dictionary).length === 0) {
         if (typeof global.contents !== 'undefined') {
            dictionary = global.contents.dictionary || {};
         } else if (constants.isNodePlatform) {
            const contents = process.domain && process.domain.service && process.domain.service.getContents();
            dictionary = contents && contents.dictionary || {};
         }
      }

      let resolveByRequire = false;
      if (!modulePath) {
         resolveByRequire = true;
         modulePath = moduleName;
      } else if (modulePath.indexOf('/') === 0) {
         resolveByRequire = true;
         modulePath = modulePath.slice(1);
      }
      if (resolveByRequire) {
         if (modulePath.substr(-ext.length - 1).indexOf(`.${ext}`) !== 0) {
            modulePath = `${modulePath}.${ext}`;
         }
         modulePath = global.requirejs.toUrl(modulePath);
      }
      modulePath = modulePath.replace(dblSlashes, '/');

      matched = modulePath.match(directoryRegexp);
      firstLevelDir = matched && (matched[3] || matched[2]);

      if (firstLevelDir && dictionary[`${firstLevelDir}.${lang}.${ext}`]) {
         if (firstLevelDir === 'ws') {
            firstLevelDir = 'WS';
         }
         dictPath = `${firstLevelDir}/lang/${lang}/${lang}.${ext}`;
      }

      return dictPath;
   },

   _plural(str, num) {
      if (str !== undefined) {
         num = Math.abs(num);
         let lang = this.getLang(),
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
   },
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
   },

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
   },
   __init: false,

   /** Разделитель между контекстом и ключом */
   _separator: '@@',

   /** Текущий язык */
   _currentLang: '',

   /** Все загруженные словари, где ключ - слово на языке оригинала */
   _dict: {},

   /** Все загруженные словари, где ключ - имя словаря */
   _dictNames: {},

   _rkString: RkString
};

// Сразу инициализируемся
i18n.init();

export default i18n;
