/// <amd-module name="I18n/_i18n/loadMetaInfo" />
// @ts-ignore
import Deferred = require('Core/Deferred');

/**
 * Функция грузит модуль с мета-информацией интерфейсного модуля.
 * @param nameModule - имя интерфейсного модуля.
 * @returns {Deferred}
 */

export default (nameModule, loader) => {
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
