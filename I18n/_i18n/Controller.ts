import {constants, cookie} from 'Env/Env';

import Loader from './Loader';
import Store from './Store';
import Translator from './Translator';

import IContext from './interfaces/IContext';
import ILoader, {ILoadingsHistory} from './interfaces/ILoader';
import IController from './interfaces/IController';
import ILocale from '../locales/Interfaces/ILocale';
import {IModule} from './interfaces/declaration';
import ITranslator from './interfaces/ITranslator';

const LENGTH_LANG_CODE = 2;
const LENGTH_LOCALE_CODE = 5;
const EXPIRES_COOKIES = 365;

export interface IConfigController {
    availableLocales?: string[];
    defaultLocale: string;
    availableContexts?: {[contextName: string]: IModule};
    loader?: ILoader;
    contextSeparator?: string;
    pluralPrefix?: string;
    pluralDelimiter?: string;
}

interface IRequest {
    headers: {
        'accept-language': string;
    };
}

class Controller implements IController {
    contextSeparator: string = '@@';
    pluralPrefix: string = 'plural#';
    pluralDelimiter: string = '|';

    protected availableLocales: string[] = [];
    protected availableContexts: {[contextName: string]: IModule} = {};
    readonly defaultLocale: string = '';
    protected defaultLocalesFromLang: { [lang: string]: string } = {};
    protected currentCodeLocale: string = '';
    protected loadableTranslator: { [context: string]: Promise<ITranslator> } = {};
    private translators: { [context: string]: ITranslator } = {};
    private localesStore: Store<ILocale>;
    private contextStore: Store<IContext>;
    readonly loader: ILoader;

    constructor(config: IConfigController) {
        this.readConfig(config);

        this.buildMapOfDefaultLocales();

        this.loader = this.loader || new Loader(this.availableContexts);

        this.initStores();
    }

    get defaultLang(): string {
        return this.defaultLocale.split('-')[0];
    }

    get currentLocale(): string {
        if (!this.isEnabled) {
            return this.defaultLocale;
        }

        if (constants.isBrowserPlatform) {
            if (!this.currentCodeLocale) {
                this.currentCodeLocale = this._calculateCodeLocale();
            }

            return this.currentCodeLocale;
        } else {
            return this._calculateCodeLocale();
        }
    }

    get currentLang(): string {
        return this.currentLocale.split('-')[0];
    }

    get loadingsHistory(): ILoadingsHistory {
        return this.loader.history;
    }

    get requiredLocales(): string[] {
        if (!this.isEnabled) {
            return [this.defaultLocale];
        }

        return constants.isServerSide ? this.availableLocales : [this.currentLocale];
    }

    get currentLocaleConfig(): ILocale {
        return this.localesStore.get(this.currentLocale, true) as ILocale || {} as ILocale;
    }

    get isEnabled(): boolean {
        return this.availableLocales.length !== 0;
    }

    setLocale(code: string, expires: number = EXPIRES_COOKIES): void {
        const fullCode = this._normalizeCode(code);

        if (fullCode && this._isSupportedLocale(fullCode)) {
            cookie.set('lang', fullCode, {
                expires,
                path: '/'
            });

            this.currentCodeLocale = fullCode;
        }
    }

    isSupportedLocale(code: string): boolean {
        return this._isSupportedLocale(this._normalizeCode(code));
    }

    isReady(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const locales = [];

            for (const localesCode of this.requiredLocales) {
                locales.push(this.localesStore.get(localesCode));
            }

            Promise.all(locales).then(() => {
                resolve();
            }).catch(reject);
        });
    }

    getTranslator(contextName: string, sync: boolean = false): Promise<ITranslator> | ITranslator {
        if (this.translators.hasOwnProperty(contextName)) {
            delete this.loadableTranslator[contextName];

            return sync ? this.translators[contextName] : Promise.resolve(this.translators[contextName]);
        }

        if (sync) {
            this.translators[contextName] = new Translator({}, this);

            if (!this.loadableTranslator.hasOwnProperty(contextName)) {
                this.loadableTranslator[contextName] = new Promise((resolve, reject) => {
                    this._getContext(contextName).then((contextContent) => {
                        this.translators[contextName].setDictionaries(contextContent);
                    }).catch(reject);
                });
            }

            return this.translators[contextName];
        }

        if (!this.loadableTranslator.hasOwnProperty(contextName)) {
            this.loadableTranslator[contextName] = new Promise((resolve, reject) => {
                this._getContext(contextName).then((contextContent) => {
                    this.translators[contextName] = new Translator(contextContent, this);

                    resolve(this.translators[contextName]);
                }).catch(reject);
            });
        }

        return this.loadableTranslator[contextName];
    }

    addContext(contextName: string, context?: IContext): void {
        this.contextStore.set(contextName, context);
    }

    addLocale(localeCode: string, locale?: ILocale): void {
        this.availableLocales.push(localeCode);
        this.buildMapOfDefaultLocales();
        this.localesStore.set(localeCode, locale);
    }

    protected readConfig(config: IConfigController): void {
        for (const nameOption of Object.keys(config)) {
            if (config[nameOption] !== undefined) {
                this[nameOption] = config[nameOption];
            }
        }
    }

    protected initStores(): void {
        this.localesStore = new Store<ILocale>(
            this.requiredLocales,
            (localeCode: string) => this.loader.locale(localeCode)
        );
        this.contextStore = new Store<IContext>(
            [],
            (contextName) => this.loader.context(contextName, this.requiredLocales)
        );
    }

    protected buildMapOfDefaultLocales(): void {
        for (const code of this.availableLocales) {
            const codeLang = code.split('-')[0];

            if (!this.defaultLocalesFromLang.hasOwnProperty(codeLang)) {
                this.defaultLocalesFromLang[codeLang] = code;
            }
        }
    }

    private _getContext(contextName: string): Promise<IContext> {
        return new Promise((resolve, reject) => {
            let context;

            if (this.isEnabled) {
                this.contextStore.set(contextName);
                context = this.contextStore.get(contextName);
            } else {
                context = Promise.resolve({});
            }

            Promise.all([context, this.isReady()]).then(([contextContent]) => {
                resolve(contextContent);
            }).catch(reject);
        });
    }

    private _calculateCodeLocale(): string {
        const langCookie = cookie.get('lang');

        if (langCookie && this._isSupportedLocale(langCookie)) {
            return langCookie;
        }

        const normalizedCodeFromCookie = this._normalizeCode(langCookie);

        if (normalizedCodeFromCookie) {
            this.setLocale(normalizedCodeFromCookie);

            return normalizedCodeFromCookie;
        }

        const detectedCode = this._detectCodeFromAcceptLanguage(Controller.getAcceptLanguage());

        if (detectedCode) {
            this.setLocale(detectedCode);

            return detectedCode;
        }

        return this.defaultLocale;
    }

    private _detectCodeFromAcceptLanguage(acceptLanguage: string[]): string {
        if (this.availableLocales.length !== 0) {
            for (const pieceHeader of acceptLanguage) {
                const code = pieceHeader.split(';')[0];

                if (Controller.isLocaleCode(code) && this._isSupportedLocale(code)) {
                    return code;
                }

                if (Controller.isLangCode(code) && this.defaultLocalesFromLang.hasOwnProperty(code)) {
                    return this.defaultLocalesFromLang[code];
                }
            }
        }

        return '';
    }

    private _isSupportedLocale(code: string): boolean {
        return this.availableLocales.includes(code);
    }

    private _normalizeCode(code: string): string {
        if (typeof code === 'string') {
            if (Controller.isLocaleCode(code)) {
                return code;
            }

            if (Controller.isLangCode(code) && this.defaultLocalesFromLang.hasOwnProperty(code)) {
                return this.defaultLocalesFromLang[code];
            }
        }

        return '';
    }

    static getAcceptLanguage(request?: IRequest): string[] {
        // @ts-ignore
        const req = request || process && process.domain && process.domain.req;
        const acceptLanguage = req && req.headers && req.headers['accept-language'];

        return acceptLanguage ? acceptLanguage.split(',') : [];
    }

    static isLangCode(code: string): boolean {
        return code.length === LENGTH_LANG_CODE;
    }

    static isLocaleCode(code: string): boolean {
        return code.length === LENGTH_LOCALE_CODE;
    }
}

export default Controller;
