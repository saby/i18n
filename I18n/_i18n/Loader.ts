import ILocale from '../locales/Interfaces/ILocale';
import ILoader from './interfaces/ILoader';
import IContext from './interfaces/IContext';
import ILoadingsHistory from './interfaces/ILoadingsHistory';
import IDictionary from './interfaces/IDictionary';
import IModule from './interfaces/IModule';
import IContents from './interfaces/IContents';

interface IRequiredResources {
   dictionary: string[];
   css: string[];
}

/**
 * Загрузчик ресурсов локализации.
 * @class I18n/_i18n/Loader
 * @implements I18n/_i18n/interfaces/ILoader
 * @public
 * @author Кудрявцев И.С.
 */
class Loader implements ILoader {

   /**
    * Объект c именами загруженных ресурсов.
    */
   history: ILoadingsHistory = {
      contexts: {},
      locales: {},
      contents: []
   };

   constructor(private availableContexts: {[contextName: string]: IModule}) {}

   /**
    * Стандартный загрузчик requirejs.
    * @param {String} url - имя загружаемого ресурса.
    * @return {Promise<unknown>}
    */
   load(url: string): Promise<unknown> {
      return import(url);
   }

   /**
    * Загружает конфигураци для локали.
    * @param {String} localeCode - код локали для которой надо загрузить конфигурацию.
    * @param {Function} [load] - функция загрузчик.
    * @return {Promise<I18n/locales/Interfaces/ILocale>}
    */
   locale(localeCode: string, load: Function = this.load): Promise<ILocale> {
      return new Promise<ILocale>((resolve, reject) => {
         const url = `I18n/locales/${localeCode}`;

         this.history.locales[localeCode] = url;

         load(url).then((locale) => {
            resolve(locale.default);
         }).catch(reject);
      });
   }

   /**
    * Загружает необходимые ресурсы для интерфейсного модуля.
    * @param {String} contextName - имя интрефесного модуля.
    * @param {String[]} requiredLocale - список локалей, для которых надо загрузить ресурсы.
    * @return {Promise<I18n/_i18n/interfaces/IContext>}
    */
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
                  loadableCss.push(this.style(contextName, css));
               }

               Promise.all([Promise.all(loadableDictionaries), Promise.all(loadableCss)]).then((resource) => {
                  const context = {};

                  for (const dictionary of resource[0]) {
                     context[dictionary[0]] = dictionary[1] || {};
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

   /**
    * Загружает словарь интерфейсного модуля.
    * @param {String} contextName - имя интрефесного модуля.
    * @param {String} localeCode - локалm, для которых надо загрузить ресурс.
    * @param {Function} [load] - функция загрузчик.
    * @return {Promise<[string, I18n/_i18n/interfaces/IDictionary]>}
    */
   dictionary(contextName: string, localeCode: string, load: Function = this.load): Promise<[string, IDictionary]> {
      const langCode = localeCode.split('-')[0];
      const url = `${this.normalizeContextName(contextName)}/lang/${langCode}/${localeCode}.json`;

      this.addContextInHistory(url, contextName, localeCode, 'dictionary');

      return load(url).then((dictionary: IDictionary) => {
         return [localeCode, dictionary];
      });
   }

   /**
    * Загружает локализуемые стили интерфейсного модуля.
    * @param {String} contextName - имя интрефесного модуля.
    * @param {String} localeCode - локаль, для которых надо загрузить ресурс.
    * @param {Function} [load] - функция загрузчик.
    * @return {Promise<void>}
    */
   style(contextName: string, localeCode: string, load: Function = this.load): Promise<void> {
      const langCode = localeCode.split('-')[0];

      const url = `${this.normalizeContextName(contextName)}/lang/${langCode}/${localeCode}`;

      this.addContextInHistory(url, contextName, localeCode, 'style');

      return load(`native-css!${url}`);
   }

   /**
    * Загружает информацию о доступных ресурсах для интерфейсного модуля.
    * @param {String} contextName - имя интрефесного модуля.
    * @param {Function} [load] - функция загрузчик.
    * @return {Promise<I18n/_i18n/interfaces/IContents>}
    */
   contents(contextName: string, load: Function = this.load): Promise<IContents> {
      return new Promise((resolve, reject) => {
         const url = `json!${contextName}/contents.json`;

         this.history.contents.push(url);

         load(url).then((contents) => {
            resolve(contents);
         }, (err) => {
            reject(err);
         });
      });
   }

   private addContextInHistory(value: string, contextName: string, localeCode: string, type: string): void {
      if (!this.history.contexts[contextName]) {
         this.history.contexts[contextName] = {};
      }

      if (!this.history.contexts[contextName][localeCode]) {
         this.history.contexts[contextName][localeCode] = {};
      }

      this.history.contexts[contextName][localeCode][type] = value;
   }

   private normalizeContextName(contextName: string): string {
      if (contextName === 'WS.Deprecated') {
         return 'Deprecated';
      }

      return contextName;
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
            } else if (!resources.dictionary.includes(langCode) && availableResources.includes(langCode)) {
               resources.dictionary.push(langCode);
            }

            if (availableResources.includes(`${localeCode}.css`)) {
               resources.css.push(localeCode);
            } else if (!resources.css.includes(langCode) && availableResources.includes(`${langCode}.css`)) {
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
            return this.contents(contextName).then((contents: IContents): string[] => {
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
}

export default Loader;
