// Используем Deferred для работоспособности плагина i18n.
// @ts-ignore
import Deferred = require('Core/Deferred');
import IConfiguration from './IConfiguration';
import constants from './Const';
import {constants as envConst} from 'Env/Env';

interface IContents {
   modules: object;
}

/** Deferred-ы с загрузками информация о локализации интерфейсных модулей */
const deferredModulesInfo = {};
/** Список загруженная информация о локализации интерфейсных модулей */
const modulesInfo = {};

/**
 * Статический класс для загрузки мета данных и конфигураций локалей.
 * class I18n/_i18n/Loader
 * @public
 * @author Кудрявцев И.С.
 */
class Loader {

   /**
    * Функция проверяет, что интерфейсный модуль грузится.
    * @param moduleName - имя интерфейсного модуля.
    * @returns {Boolean}
    */
   static isLoadedModule(moduleName: string): boolean {
      return deferredModulesInfo.hasOwnProperty(moduleName);
   }

   /**
    * Метод возвращает список словарей поддерживаемых интерфейсным модулем.
    * @param {String} moduleName - имя интерфейсного модуля
    * @param {Function|String|Object} loader - Функция загрузки словарей, либо url на контентс, либо сам contents
    * @returns {Deferred}
    * @see isLoadedModule
    */
   static getAvailableDictionary(moduleName: string, loader?: Function | string | IContents): Deferred<string[]> {
      if (Loader.isLoadedModule(moduleName)) {
         return deferredModulesInfo[moduleName].addCallback(function() {
            return modulesInfo[moduleName];
         });
      }

      if (typeof loader === 'string') {
         deferredModulesInfo[moduleName] = Loader.loadContents(loader, moduleName).addCallback(function(info) {
            modulesInfo[moduleName] = info;
            return modulesInfo[moduleName];
         });
      }

      if (typeof loader === 'function') {
         deferredModulesInfo[moduleName] = new Deferred<string[]>();
         const result = loader();

         if (result instanceof Promise) {
            result.then((info) => {
               modulesInfo[moduleName] = info;
               deferredModulesInfo[moduleName].callback(modulesInfo[moduleName]);
            });
         }

         if (result instanceof Array) {
            modulesInfo[moduleName] = result;
            deferredModulesInfo[moduleName].callback(modulesInfo[moduleName]);
         }
      }

      if (typeof loader === 'object') {
         deferredModulesInfo[moduleName] = new Deferred<string[]>();
         modulesInfo[moduleName] = Loader.extractAvailableDictionaries(moduleName, loader);
         deferredModulesInfo[moduleName].callback(modulesInfo[moduleName]);
      }

      return deferredModulesInfo[moduleName];
   }

   protected static loadContents(url: string, moduleName: string): Deferred<string[]> {
      const result = new Deferred<string[]>();

      if (envConst.isBrowserPlatform) {
         fetch(url, {
            credentials: 'include'
         }).then((response) => {
            if (response.ok) {
               response.json().then((contents) => {
                  result.callback(Loader.extractAvailableDictionaries(moduleName, contents));
               }, (err) => {
                  result.errback(err);
               });
            } else {
               result.errback(response.status);
            }
         }, (err) => {
            result.errback(err);
         });
      } else {
         import(`json!${url}`).then((contents) => {
            result.callback(Loader.extractAvailableDictionaries(moduleName, contents));
         }, (err) => {
            result.errback(err);
         });
      }

      return result;
   }

   protected static extractAvailableDictionaries(moduleName: string, contents: IContents): string[] {
      if (contents.modules && contents.modules[moduleName] && contents.modules[moduleName].dict) {
         return contents.modules[moduleName].dict;
      }

      return [];
   }

   /**
    * Загрузка конфигурации для локали.
    * @param {String} locale - код локали.
    * @param {Function} loader - имя интерфейсного модуля.
    * @returns {Deferred<IConfiguration>}
    */
   static loadConfiguration(locale: string, loader: Function = require): Deferred<IConfiguration> {
      const result = new Deferred<IConfiguration>();
      const [language, country] = locale.split('-');
      const configurations = [];

      if (language && constants.availableLang.includes(language)) {
         configurations.push(`I18n/locales/language/${language}`);

         if (country && constants.availableCountry.includes(country)) {
            configurations.push(`I18n/locales/format/${country}`);
         } else {
            configurations.push(`I18n/locales/format/${constants.defaultCountry[language]}`);
         }
      }

      loader(configurations, (base, additional) => {
         if (base) {
            const code = `${base.default.code}${additional ? '-' + additional.default.code : ''}`;

            result.callback({...base.default, ...additional.default, code});
         } else {
            result.errback(`Language ${language} is not supported`);
         }
      }, (err) => {
         result.errback(err);
      });

      return result;
   }
}

export default Loader;
