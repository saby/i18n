// Используем Deferred для работоспособности плагина i18n.
// @ts-ignore
import Deferred = require('Core/Deferred');
import IConfiguration from './IConfiguration';
import constants from './Const';

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
      return deferredModulesInfo.hasOwnProperty(nameModule);
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
         return deferredModulesInfo[nameModule].addCallback(function() {
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

   /**
    * Функция грузит модуль с мета-информацией интерфейсного модуля.
    * @param nameModule - имя интерфейсного модуля.
    * @param loader - имя интерфейсного модуля.
    * @returns {Deferred}
    */
   protected static loadMetaInfo(nameModule: string, loader: Function = require): Deferred<IModuleInfo> {
      const def = new Deferred<IModuleInfo>();

      /*
      Если модуль внешний и он не поддерживает локализацию, то билдер не создаёт в нём инфо-модуль .builder/module,
      в результате require выводит 404 ошибку в консоль, единственный вариант заглушить ошибку,
      использовать плагин optional.
       */
      loader(['optional!' + nameModule + '/.builder/module'], (info) => {
         const infoDict = {};

         if (info instanceof Object && info.dict) {
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
