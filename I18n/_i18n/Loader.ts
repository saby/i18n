// Используем Deferred для работоспособности плагина i18n.
// @ts-ignore
import Deferred = require('Core/Deferred');
import IConfiguration from './IConfiguration';

const AVAILABLE_LANGUAGE = ['en', 'ru'];
const AVAILABLE_COUNTRY = ['US', 'RU'];
const DEFAULT_COUNTRY = {
  en: 'US',
  ru: 'RU'
};

interface IModuleInfo {
   dict: [];
}

/** Deferred-ы с загрузками информация о локализации интерфейсных модулей */
const deferredModulesInfo = {};
/** Вся загруженная информация о локализации интерфейсных модулей */
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
    * @param nameModule - имя интерфейсного модуля.
    * @returns {Boolean}
    */
   static isLoadedModule(nameModule: string): boolean {
      return modulesInfo.hasOwnProperty(nameModule);
   }

   /**
    * Метод возвращает информацию о словарях поддерживаемых интерфейсным модулем.
    * @param nameModule - имя интерфейсного модуля
    * @param loader - имя интерфейсного модуля
    * @returns {Deferred}
    * @see isProcessedModule
    */
   static loadModule(nameModule: string, loader?: Function): Deferred<IModuleInfo> {
      if (Loader.isLoadedModule(nameModule)) {
         return deferredModulesInfo[nameModule].addcallbak(function() {
            return modulesInfo[nameModule];
         });
      }

      deferredModulesInfo[nameModule] = Loader.loadMetaInfo(nameModule, loader).addCallback(function(info) {
         modulesInfo[nameModule] = info;
         return modulesInfo[nameModule];
      });

      return deferredModulesInfo[nameModule];
   }

   /**
    * Загрузка конфигурации для локали.
    * @param {String} locale - код локали.
    * @returns {Promise<IConfiguration>}
    */
   static loadConfiguration(locale: string): Promise<IConfiguration> {
      return new Promise((resolve, reject) => {
         const [language, country] = locale.split('-');
         const configurations = [];

         if (language && AVAILABLE_LANGUAGE.includes(language)) {
            configurations.push(import(`I18n/locales/language/${language}`));

            if (country && AVAILABLE_COUNTRY.includes(country)) {
               configurations.push(import(`I18n/locales/format/${country}`));
            } else {
               configurations.push(import(`I18n/locales/format/${DEFAULT_COUNTRY[language]}`));
            }
         }

         Promise.all(configurations).then((result) => {
            if (result.length !== 0) {
               const code = `${result[0].default.code}${result[1] ? '-' + result[1].default.code : ''}`;

               resolve({...result[0].default, ...result[1].default, code});
            } else {
               reject(`Language ${language} is not supported`);
            }
         }, (err) => {
            reject(err.message);
         });
      });
   }

   /**
    * Функция грузит модуль с мета-информацией интерфейсного модуля.
    * @param nameModule - имя интерфейсного модуля.
    * @param loader - имя интерфейсного модуля.
    * @returns {Deferred}
    */
   protected static loadMetaInfo(nameModule: string, loader: Function = require): Deferred<IModuleInfo> {
      const def = new Deferred();

      loader([nameModule + '/.builder/module'], (info) => {
         const infoDict = {};

         if (info.dict) {
            for (const nameDict of info.dict) {
               const langAndExtDict = nameDict.split('.');

               infoDict[langAndExtDict[0]] = infoDict[langAndExtDict[0]] || [];
               infoDict[langAndExtDict[0]].push(langAndExtDict[1] ? langAndExtDict[1] : 'json');
            }
         }

         def.callback(infoDict);
      }, () => {
         def.callback({});
      });

      return def;
   }
}

export default Loader;
