import ILoader from '../interfaces/ILoader';
import IContext from '../interfaces/IContext';
import ILoadingsHistory from '../interfaces/ILoadingsHistory';
import IDictionary from '../interfaces/IDictionary';
import IModule from '../interfaces/IModule';
import IContents from '../interfaces/IContents';
import ILangConfig from '../interfaces/ILangConfig';
import IRegionConfig from '../interfaces/IRegionConfig';
import { langCode, localeCode, regionCode } from '../interfaces/IAvailableCodes';

interface IRequiredResources {
    dictionary: langCode[];
    css: langCode[];
}

/**
 * Загрузчик ресурсов локализации.
 * @public
 * @author Кудрявцев И.С.
 */
class Loader implements ILoader {
    history: ILoadingsHistory = {
        contexts: {},
        contents: {},
        languages: {},
        regions: {},
    };

    constructor(private availableContexts: { [contextName: string]: IModule }) {}

    /**
     * Стандартный загрузчик, requirejs.
     * @param url Имя загружаемого ресурса.
     */
    load(url: string): Promise<unknown> {
        return import(url);
    }

    region(code: regionCode, load: Function = this.load): Promise<IRegionConfig> {
        this.history.regions[code] = `LocalizationConfigs/localization_configs/${code}.json`;

        return load(this.history.regions[code]);
    }

    async language(code: langCode, load: Function = this.load): Promise<ILangConfig> {
        this.history.languages[code] = `I18n/locales/${code}`;

        return (await load(this.history.languages[code])).default;
    }

    async context(
        contextName: string,
        requiredLanguages: langCode[],
        requiredRegion: regionCode
    ): Promise<IContext> {
        if (this.availableContexts.hasOwnProperty(contextName)) {
            const requireResources = await this.getRequiredResources(
                contextName,
                requiredLanguages,
                requiredRegion
            );
            const loadableDictionaries = [];
            const loadableCss = [];
            const context = {};

            for (const dictionary of requireResources.dictionary) {
                loadableDictionaries.push(this.dictionary(contextName, dictionary));
            }

            for (const css of requireResources.css) {
                loadableCss.push(this.style(contextName, css));
            }

            const [dictionaries] = await Promise.all([
                Promise.all(loadableDictionaries),
                Promise.all(loadableCss),
            ]);

            for (const [code, dictionary] of dictionaries) {
                context[code] = dictionary || {};
            }

            return context;
        } else {
            return {};
        }
    }

    /**
     * Загружает словарь интерфейсного модуля.
     * @param contextName Имя интрефесного модуля.
     * @param dictName Язык или локаль, для которого надо загрузить ресурс.
     * @param [load] Функция загрузчик.
     */
    async dictionary(
        contextName: string,
        dictName: langCode | localeCode,
        load: Function = this.load
    ): Promise<[langCode, IDictionary]> {
        const lang = dictName.split('-')[0] as langCode;
        const url = `${this.normalizeContextName(contextName)}/lang/${lang}/${dictName}.json`;

        this.addContextInHistory(url, contextName, lang, 'dictionary');

        return [lang, await load(url)];
    }

    /**
     * Загружает локализуемые стили интерфейсного модуля.
     * @param contextName Имя интерфейсного модуля.
     * @param languageCode Язык, для которого надо загрузить ресурс.
     * @param [load] Функция загрузчик.
     */
    style(contextName: string, languageCode: langCode, load: Function = this.load): Promise<void> {
        const url = `${this.normalizeContextName(
            contextName
        )}/lang/${languageCode}/${languageCode}`;

        this.addContextInHistory(url, contextName, languageCode, 'style');

        return load(`native-css!${url}`);
    }

    /**
     * Загружает информацию о доступных ресурсах для интерфейсного модуля.
     * @param contextName Имя интрефесного модуля.
     * @param [load] Функция загрузчик.
     */
    contents(contextName: string, load: Function = this.load): Promise<IContents> {
        this.history.contents[contextName] = `${contextName}/contents.json`;

        return load(this.history.contents[contextName]);
    }

    private addContextInHistory(
        value: string,
        contextName: string,
        languageCode: langCode,
        type: string
    ): void {
        if (!this.history.contexts[contextName]) {
            this.history.contexts[contextName] = {};
        }

        if (!this.history.contexts[contextName][languageCode]) {
            this.history.contexts[contextName][languageCode] = {};
        }

        this.history.contexts[contextName][languageCode][type] = value;
    }

    private normalizeContextName(contextName: string): string {
        if (contextName === 'WS.Deprecated') {
            return 'Deprecated';
        }

        return contextName;
    }

    private async getRequiredResources(
        contextName: string,
        requiredLanguages: langCode[],
        requiredRegion: regionCode
    ): Promise<IRequiredResources> {
        const availableResources = await this.getAvailableResource(contextName);
        const resources = {
            dictionary: [],
            css: [],
        };

        for (const languageCode of requiredLanguages) {
            const localeCode = `${languageCode}-${requiredRegion}`;

            if (availableResources.includes(localeCode)) {
                resources.dictionary.push(localeCode);

                continue;
            }

            if (availableResources.includes(languageCode)) {
                resources.dictionary.push(languageCode);
            }

            if (availableResources.includes(`${languageCode}.css`)) {
                resources.css.push(languageCode);
            }
        }

        return resources;
    }

    private async getAvailableResource(contextName: string): Promise<string[]> {
        const context = this.availableContexts[contextName];

        if (context) {
            if (context.path) {
                const contents = await this.contents(contextName);

                if (contents.modules[contextName] && contents.modules[contextName].dict) {
                    return contents.modules[contextName].dict;
                }
            }

            if (context.dict) {
                return this.availableContexts[contextName].dict;
            }
        }

        return [];
    }
}

export default Loader;
