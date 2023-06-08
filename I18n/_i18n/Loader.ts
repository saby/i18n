import ILocale from '../interfaces/ILocale';
import ILoader from '../interfaces/ILoader';
import IContext from '../interfaces/IContext';
import ILoadingsHistory from '../interfaces/ILoadingsHistory';
import IDictionary from '../interfaces/IDictionary';
import IModule from '../interfaces/IModule';
import IContents from '../interfaces/IContents';

interface IRequiredResources {
    dictionary: string[];
    css: string[];
}

/**
 * Загрузчик ресурсов локализации.
 * @public
 * @author Кудрявцев И.С.
 */
class Loader implements ILoader {
    history: ILoadingsHistory = {
        contexts: {},
        locales: {},
        contents: {},
    };

    constructor(private availableContexts: { [contextName: string]: IModule }) {}

    /**
     * Стандартный загрузчик, requirejs.
     * @param url Имя загружаемого ресурса.
     */
    load(url: string): Promise<unknown> {
        return import(url);
    }

    locale(localeCode: string, load: Function = this.load): Promise<ILocale> {
        return new Promise<ILocale>((resolve, reject) => {
            this.history.locales[localeCode] = `I18n/locales/${localeCode}`;

            load(this.history.locales[localeCode])
                .then((locale) => {
                    resolve(locale.default);
                })
                .catch(reject);
        });
    }

    context(contextName: string, requiredLocale: string[]): Promise<IContext> {
        return new Promise((resolve, reject) => {
            if (this.availableContexts.hasOwnProperty(contextName)) {
                this.getRequiredResources(contextName, requiredLocale).then(
                    (requireResources: IRequiredResources) => {
                        const loadableDictionaries = [];
                        const loadableCss = [];

                        for (const dictionary of requireResources.dictionary) {
                            loadableDictionaries.push(this.dictionary(contextName, dictionary));
                        }

                        for (const css of requireResources.css) {
                            loadableCss.push(this.style(contextName, css));
                        }

                        Promise.all([Promise.all(loadableDictionaries), Promise.all(loadableCss)])
                            .then((resource) => {
                                const context = {};

                                for (const dictionary of resource[0]) {
                                    context[dictionary[0]] = dictionary[1] || {};
                                }

                                this.normalizeContext(context, requiredLocale);

                                resolve(context);
                            })
                            .catch(reject);
                    },
                    (err) => {
                        reject(err);
                    }
                );
            } else {
                resolve({});
            }
        });
    }

    /**
     * Загружает словарь интерфейсного модуля.
     * @param contextName Имя интрефесного модуля.
     * @param localeCode Локаль, для которых надо загрузить ресурс.
     * @param load Функция загрузчик.
     */
    dictionary(
        contextName: string,
        localeCode: string,
        load: Function = this.load
    ): Promise<[string, IDictionary]> {
        const langCode = localeCode.split('-')[0];
        const url = `${this.normalizeContextName(contextName)}/lang/${langCode}/${localeCode}.json`;

        this.addContextInHistory(url, contextName, localeCode, 'dictionary');

        return load(url).then((dictionary: IDictionary) => {
            return [localeCode, dictionary];
        });
    }

    /**
     * Загружает локализуемые стили интерфейсного модуля.
     * @param contextName Имя интрефесного модуля.
     * @param localeCode Локаль, для которых надо загрузить ресурс.
     * @param load Функция загрузчик.
     */
    style(contextName: string, localeCode: string, load: Function = this.load): Promise<void> {
        const langCode = localeCode.split('-')[0];

        const url = `${this.normalizeContextName(contextName)}/lang/${langCode}/${localeCode}`;

        this.addContextInHistory(url, contextName, localeCode, 'style');

        return load(`native-css!${url}`);
    }

    /**
     * Загружает информацию о доступных ресурсах для интерфейсного модуля.
     * @param contextName Имя интрефесного модуля.
     * @param load Функция загрузчик.
     */
    contents(contextName: string, load: Function = this.load): Promise<IContents> {
        return new Promise((resolve, reject) => {
            this.history.contents[contextName] = `${contextName}/contents.json`;

            load(this.history.contents[contextName]).then(
                (contents) => {
                    resolve(contents);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }

    private addContextInHistory(
        value: string,
        contextName: string,
        localeCode: string,
        type: string
    ): void {
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

    private getRequiredResources(
        contextName: string,
        requiredLocales: string[]
    ): Promise<IRequiredResources> {
        return this.getAvailableResource(contextName).then(
            (availableResources: string[]): IRequiredResources => {
                const resources = {
                    dictionary: [],
                    css: [],
                };

                for (const localeCode of requiredLocales) {
                    const langCode = localeCode.split('-')[0];

                    if (availableResources.includes(localeCode)) {
                        resources.dictionary.push(localeCode);
                    } else if (
                        !resources.dictionary.includes(langCode) &&
                        availableResources.includes(langCode)
                    ) {
                        resources.dictionary.push(langCode);
                    }

                    if (availableResources.includes(`${localeCode}.css`)) {
                        resources.css.push(localeCode);
                    } else if (
                        !resources.css.includes(langCode) &&
                        availableResources.includes(`${langCode}.css`)
                    ) {
                        resources.css.push(langCode);
                    }
                }

                return resources;
            }
        );
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
