// Используем Deferred для работоспособности плагина i18n.
// @ts-ignore
import Deferred = require('Core/Deferred');
import IConfiguration from './IConfiguration';
import constants from './Const';
import {constants as envConst} from 'Env/Env';
import ILocale from '../locales/Interfaces/ILocale';
import ILoader from './interfaces/ILoader';
import IContext, {IDictionary} from './interfaces/IContext';
import {IContents, IModule} from './interfaces/declaration';

/** Deferred-ы с загрузками информация о локализации интерфейсных модулей */
const deferredModulesInfo = {};
/** Список загруженная информация о локализации интерфейсных модулей */
const modulesInfo = {};

interface IRequiredResources {
   dictionary: string[];
   css: string[];
}

/**
 * Класс загрузчика мета данных и конфигураций локалей.
 * class I18n/_i18n/Loader
 * @public
 * @author Кудрявцев И.С.
 */
class Loader implements ILoader {
   constructor(private availableContexts: {[contextName: string]: IModule}) {}

   locale(localeCode: string): Promise<ILocale> {
      return import(`I18n/locales/${localeCode}`);
   }

   context(contextName: string, requiredLocale: string[]): Promise<IContext> {
      return new Promise((resolve, reject) => {
         if (this.availableContexts.hasOwnProperty(contextName)) {
            this.getRequiredResources(contextName, requiredLocale).then((requireResources: IRequiredResources) => {
               const loadableDictionaries = [];
               const loadableCss = [];

               for (const dictionary of requireResources.dictionary) {
                  loadableDictionaries.push(this.dictionary(contextName, dictionary));
               }

               for (const css of requireResources.css) {
                  loadableCss.push(this.css(contextName, css));
               }

               Promise.all([Promise.all(loadableDictionaries), Promise.all(loadableCss)]).then((resource) => {
                  const context = {};

                  for (const dictionary of resource[0]) {
                     context[dictionary[0]] = dictionary[1];
                  }

                  this.normalizeContext(context, requiredLocale);

                  resolve(context);
               }).catch(reject);
            }, (err) => {
               reject(err);
            });
         } else {
            resolve({});
         }
      });
   }

   dictionary(contextName: string, localeCode: string): Promise<[string, IDictionary]> {
      const langCode = localeCode.split('-')[0];

      return import(`${contextName}/lang/${langCode}/${localeCode}.json`).then((dictionary: IDictionary) => {
         return [localeCode, dictionary];
      });
   }

   css(contextName: string, localeCode: string): Promise<void> {
      const langCode = localeCode.split('-');

      return import(`native-css!${contextName}/lang/${langCode}/${localeCode}`);
   }

   contents(contextName: string): Promise<IContents> {
      return new Promise((resolve, reject) => {
         const context = this.availableContexts[contextName];

         const url = `${context.path.startsWith('/') ? '' : '/'}${context.path}/contents.json`;

         if (envConst.isBrowserPlatform) {
            fetch(url, {
               credentials: 'include'
            }).then((response) => {
               if (response.ok) {
                  response.json().then((contents) => {
                     resolve(contents);
                  }, (err) => {
                     reject(err);
                  });
               } else {
                  reject(response.status);
               }
            }, (err) => {
               reject(err);
            });
         } else {
            import(`json!${url}`).then((contents) => {
               resolve(contents);
            }, (err) => {
               reject(err);
            });
         }
      });
   }

   private normalizeContext(context: IContext, requiredLocales: string[]): void {
      for (const localeCode of requiredLocales) {
         if (!context.hasOwnProperty(localeCode)) {
            const langCode = localeCode.split('-')[0];

            if (context.hasOwnProperty(langCode)) {
               context[localeCode] = context[langCode];
            }
         }
      }
   }

   private getRequiredResources(contextName: string, requiredLocales: string[]): Promise<IRequiredResources> {
      return this.getAvailableResource(contextName).then((availableResources: string[]): IRequiredResources => {
         const resources = {
            dictionary: [],
            css: []
         };

         for (const localeCode of requiredLocales) {
            const langCode = localeCode.split('-')[0];

            if (availableResources.includes(localeCode)) {
               resources.dictionary.push(localeCode);

               continue;
            } else if (availableResources.includes(langCode)) {
               resources.dictionary.push(langCode);

               continue;
            }

            if (availableResources.includes(`${localeCode}.css`)) {
               resources.css.push(localeCode);
            } else if (availableResources.includes(`${langCode}.css`)) {
               resources.css.push(langCode);
            }
         }

         return resources;
      });
   }

   private getAvailableResource(contextName: string): Promise<string[]> {
      const context = this.availableContexts[contextName];

      if (context) {
         if (context.path) {
            this.contents(contextName).then((contents: IContents): string[] => {
               if (contents.modules[contextName] && contents.modules[contextName].dict) {
                  return contents.modules[contextName].dict;
               }

               return [];
            });
         }

         if (context.dict) {
            return Promise.resolve(this.availableContexts[contextName].dict);
         }
      }

      return Promise.resolve([]);
   }

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
         return deferredModulesInfo[moduleName].addCallback(() => {
            return modulesInfo[moduleName];
         });
      }

      if (typeof loader === 'string') {
         deferredModulesInfo[moduleName] = Loader.loadContents(loader, moduleName).addCallback((info) => {
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
      const [language, country]: string[] = locale.split('-');
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
