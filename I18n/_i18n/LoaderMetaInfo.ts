/// <amd-module name="I18n/_i18n/LoaderMetaInfo" />
// @ts-ignore
import Deferred = require('Core/Deferred');

/** Вся загруженная информация о локализации интерфейсных модулей */
const modulesInfo = {};

class LoaderMetaInfo {
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
        if (LoaderMetaInfo.isProcessedModule(nameModule)) {
            return modulesInfo[nameModule];
        }

        modulesInfo[nameModule] = LoaderMetaInfo.loadMetaInfo(nameModule, loader);

        return modulesInfo[nameModule];
    }

    /**
     * Функция грузит модуль с мета-информацией интерфейсного модуля.
     * @param nameModule - имя интерфейсного модуля.
     * @returns {Deferred}
     */
    protected static loadMetaInfo(nameModule, loader) {
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

export default LoaderMetaInfo;
