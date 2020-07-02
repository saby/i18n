import ILocale from '../locales/Interfaces/ILocale';
import ILoader, {ILoadingsHistory} from './interfaces/ILoader';
import IContext, {IDictionary} from './interfaces/IContext';
import {IContents, IModule} from './interfaces/declaration';

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
   history: ILoadingsHistory = {
      dictionaries: [],
      styles: [],
      locales: [],
      contents: []
   };

   constructor(private availableContexts: {[contextName: string]: IModule}) {}

   load(path: string): Promise<unknown> {
      return import(path);
   }

   locale(localeCode: string, load: Function = this.load): Promise<ILocale> {
      return new Promise<ILocale>((resolve, reject) => {
         const url = `I18n/locales/${localeCode}`;

         this.history.locales.push(url);

         load(url).then((locale) => {
            resolve(locale.default);
         }).catch(reject);
      });
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

   dictionary(contextName: string, localeCode: string, load: Function = this.load): Promise<[string, IDictionary]> {
      const langCode = localeCode.split('-')[0];
      const url = `${this.normalizeContextName(contextName)}/lang/${langCode}/${localeCode}.json`;

      this.history.dictionaries.push(url);

      return load(url).then((dictionary: IDictionary) => {
         return [localeCode, dictionary];
      });
   }

   css(contextName: string, localeCode: string, load: Function = this.load): Promise<void> {
      const langCode = localeCode.split('-')[0];

      const url = `${this.normalizeContextName(contextName)}/lang/${langCode}/${localeCode}`;

      this.history.styles.push(url);

      return load(`native-css!${url}`);
   }

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
