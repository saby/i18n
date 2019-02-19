// Используем Deferred для работоспособности плагина i18n.
// @ts-ignore
import Deferred = require('Core/Deferred');
import {IoC} from "../../Env/Env";
import IConfiguration from "./IConfiguration";

interface IModuleInfo {
   dict: []
}

/** Вся загруженная информация о локализации интерфейсных модулей */
const modulesInfo = {};

class Loader {
   static locale(locale: string): Promise<IConfiguration> {
      return import(`I18n/locales/${locale}`).then(
         settingLocal => settingLocal,
         err => {
            IoC.resolve('ILogger').error('Localization', `Для локали ${locale} не смог загрузить настройки.`);
         });
   }

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
         return modulesInfo[nameModule];
      }

      modulesInfo[nameModule] = Loader.loadMetaInfo(nameModule, loader);

      return modulesInfo[nameModule];
   }

   /**
    * Функция грузит модуль с мета-информацией интерфейсного модуля.
    * @param nameModule - имя интерфейсного модуля.
    * @param loader - имя интерфейсного модуля.
    * @returns {Deferred}
    */
   protected static loadMetaInfo(nameModule: string, loader: Function=require): Deferred<IModuleInfo> {
      const def = new Deferred();

      loader([nameModule + "/.builder/module"], info => {
         const infoDict = {};

         if (info.dict) {
            for (const nameDict of info.dict) {
               const langAndExtDict = nameDict.split('.');

               infoDict[langAndExtDict[0]] = infoDict[langAndExtDict[0]] || [];
               infoDict[langAndExtDict[0]].push(langAndExtDict[1] ? langAndExtDict[1]: 'json');
            }
         }

         def.callback(infoDict);
      }, err => {
         def.errback(err);
      });

      return def;
   }
}

export default Loader;
