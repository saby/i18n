import IContext from '../interfaces/IContext';
import ILoadingsHistory from '../interfaces/ILoadingsHistory';
import IDictionary from '../interfaces/IDictionary';
import IModule from '../interfaces/IModule';
import IContents from '../interfaces/IContents';
import ILangConfig from '../interfaces/ILangConfig';
import IRegionConfig from '../interfaces/IRegionConfig';
import type { langCode, localeCode, regionCode } from '../interfaces/IAvailableCodes';

interface IRequiredResources {
    dictionary: (langCode | localeCode)[];
    css: langCode[];
}

interface ILangConfigFile {
    default: ILangConfig;
}

/**
 * Загрузчик ресурсов локализации.
 * @public
 * @author Кудрявцев И.С.
 */
class Loader {
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
    load<T>(url: string): Promise<T> {
        return import(url);
    }

    region(
        code: regionCode,
        load: (url: string) => ReturnType<Loader['region']> = this.load<IRegionConfig>
    ): Promise<IRegionConfig> {
        this.history.regions[code] = `LocalizationConfigs/localization_configs/${code}.json`;

        return load(this.history.regions[code]);
    }

    async language(
        code: langCode,
        load: (url: string) => Promise<ILangConfigFile> = this.load<ILangConfigFile>
    ): Promise<ILangConfig> {
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
            const context: IContext = {};

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
        load: (url: string) => Promise<IDictionary> = this.load<IDictionary>
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
    style(
        contextName: string,
        languageCode: langCode,
        load: (url: string) => Promise<void> = this.load<void>
    ): Promise<void> {
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
    contents(
        contextName: string,
        load: (url: string) => ReturnType<Loader['contents']> = this.load<IContents>
    ): Promise<IContents> {
        this.history.contents[contextName] = `${contextName}/contents.json`;

        return load(this.history.contents[contextName]);
    }

    private addContextInHistory(
        value: string,
        contextName: string,
        languageCode: langCode,
        type: 'dictionary' | 'style'
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
        const resources: IRequiredResources = {
            dictionary: [],
            css: [],
        };

        for (const languageCode of requiredLanguages) {
            const localeCode: localeCode = `${languageCode}-${requiredRegion}`;

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
                const module = contents.modules[contextName];

                if (module?.dict) {
                    return module.dict;
                }
            }

            if (context.dict) {
                return context.dict;
            }
        }

        return [];
    }
}

export default Loader;
