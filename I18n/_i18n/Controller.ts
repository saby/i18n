import { constants, cookie } from 'Env/Env';
import { location } from 'Application/Env';
import { isInit } from 'Application/Initializer';
import { getModuleUrl, getResourceUrl } from 'RequireJsLoader/conduct';

import Loader from './Loader';
import Store from './Store';
import Translator from './Translator';

import IContext from '../interfaces/IContext';
import ILoader from '../interfaces/ILoader';
import IController from '../interfaces/IController';
import ILocale from '../interfaces/ILocale';
import ITranslator from '../interfaces/ITranslator';
import IStore from '../interfaces/IStore';
import ILoadingsHistory from '../interfaces/ILoadingsHistory';
import IModule from '../interfaces/IModule';

const LENGTH_LANG_CODE = 2;
const LENGTH_LOCALE_CODE = 5;
const EXPIRES_COOKIES = 365;

export interface IConfigController {
    availableLocales?: string[];
    defaultLocale: string;
    availableContexts?: IModuleStore;
    loader?: ILoader;
    contextSeparator?: string;
    pluralPrefix?: string;
    pluralDelimiter?: string;
}

interface ITranslatorStore {
    [context: string]: Promise<ITranslator>;
}

interface IModuleStore {
    [contextName: string]: IModule;
}

interface IRequest {
    headers: {
        'accept-language': string;
    };
}

/**
 * Контролер для работы и взаимодействия с механизмом локализации.
 * @public
 * @author Кудрявцев И.С.
 */
class Controller implements IController {
    contextSeparator: string = '@@';
    pluralPrefix: string = 'plural#';
    pluralDelimiter: string = '|';
    availableLocales: string[] = [];
    translators: { [context: string]: ITranslator } = {};

    readonly defaultLocale: string = '';

    /**
     * Загрузчик ресурсов локализации.
     */
    readonly loader: ILoader;

    protected availableContexts: IModuleStore = {};
    protected currentCodeLocale: string = '';
    protected currentCodeRegion: string = '';
    protected loadableTranslator: ITranslatorStore = {};
    protected localesStore: IStore<ILocale>;
    protected contextStore: IStore<IContext>;

    constructor(config: IConfigController) {
        this.readConfig(config);

        this.loader = this.loader || new Loader(this.availableContexts);

        this.initStores();
    }

    get requiredLocales(): string[] {
        if (!this.isEnabled) {
            return [this.defaultLocale];
        }

        return constants.isServerSide ? this.availableLocales : [this.currentLocale];
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

    get currentCountry(): string {
        if (constants.isBrowserPlatform) {
            if (!this.currentCodeRegion) {
                this.currentCodeRegion = this._calculateRegion();
            }

            return this.currentCodeRegion;
        }

        return this._calculateRegion();
    }

    get loadingsHistory(): ILoadingsHistory {
        return this.loader.history;
    }

    get currentLocaleConfig(): ILocale {
        return (this.localesStore.get(this.currentLocale, true) as ILocale) || ({} as ILocale);
    }

    getCurrentLocaleConfig(): Promise<ILocale> {
        return this.isReady().then(() => {
            return this.currentLocaleConfig;
        });
    }

    get isEnabled(): boolean {
        return this.availableLocales.length !== 0;
    }

    hasTranslator(contextName: string): boolean {
        return this.translators.hasOwnProperty(contextName);
    }

    /**
     * Устанавливает код локали в куку lang.
     * @param code Код локали.
     * @param expires Время жизни куки.
     */
    setLocale(code: string, expires: number = EXPIRES_COOKIES): void {
        const fullCode = this._normalizeCode(code);

        if (fullCode && this._isSupportedLocale(fullCode)) {
            cookie.set('lang', fullCode, {
                expires,
                path: '/',
            });

            this.currentCodeLocale = fullCode;
        }
    }

    /**
     * Проверяет, поддерживается ли код локали или языка.
     * @param code Код локали.
     */
    isSupportedLocale(code: string): boolean {
        return this._isSupportedLocale(this._normalizeCode(code));
    }

    isReady(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const locales = [];

            for (const localesCode of this.requiredLocales) {
                locales.push(this.localesStore.get(localesCode));
            }

            Promise.all(locales)
                .then(() => {
                    resolve(true);
                })
                .catch(reject);
        });
    }

    /**
     * Возврашает переводчик для контекста.
     * @param contextName Имя контекста.
     * @param sync Получить переводчик синхроно, если это первый запрос за ним, вернёт undefined.
     */
    getTranslator(contextName: string, sync: boolean = false): Promise<ITranslator> | ITranslator {
        if (this.hasTranslator(contextName)) {
            delete this.loadableTranslator[contextName];

            return sync
                ? this.getSyncTranslator(contextName)
                : Promise.resolve(this.getSyncTranslator(contextName));
        }

        if (sync) {
            this.translators[contextName] = new Translator({}, this);

            if (!this.loadableTranslator.hasOwnProperty(contextName)) {
                this.loadableTranslator[contextName] = new Promise((resolve, reject) => {
                    this._getContext(contextName)
                        .then((contextContent) => {
                            const translator = this.getSyncTranslator(contextName);

                            translator.setDictionaries(contextContent);

                            resolve(translator);
                        })
                        .catch(reject);
                });
            }

            return this.getSyncTranslator(contextName);
        }

        if (!this.loadableTranslator.hasOwnProperty(contextName)) {
            this.loadableTranslator[contextName] = new Promise((resolve, reject) => {
                this._getContext(contextName)
                    .then((contextContent) => {
                        this.translators[contextName] = new Translator(contextContent, this);

                        resolve(this.getSyncTranslator(contextName));
                    })
                    .catch(reject);
            });
        }

        return this.loadableTranslator[contextName];
    }

    getSyncTranslator(contextName: string): ITranslator {
        return this.translators[contextName];
    }

    /**
     * Добавляет контекст в хранилище.
     * @param contextName Имя контекста.
     * @param context Ресурсы контекста.
     */
    addContext(contextName: string, context?: IContext): void {
        this.contextStore.set(contextName, context);
    }

    /**
     * Добавляет локаль в хранилище.
     * @param localeCode Код локали.
     * @param locale конфигурация локали.
     * @param isAvailable Надо ли добавить локаль в доступные.
     */
    addLocale(localeCode: string, locale?: ILocale, isAvailable: boolean = true): void {
        if (!this.availableLocales.includes(localeCode)) {
            if (isAvailable) {
                this.availableLocales.push(localeCode);
            }

            this.localesStore.set(localeCode, locale);
        }
    }

    /**
     * Возвращает готовый для использования url локализуемого изображения для установленной локали. Подставит версию, домен.
     * Изображения должны располагаться в папке images и располагаться на одном уровне со словарями.
     * Если ваш модуль лежит на cdn, вам необходимо передать версию через параметр version.
     * Пример расположения: ModuleName/lang/en/images/menu/logo.png
     * Пример url-a: //cdn.sbis.ru/static/resources/ModuleName/lang/en/images/menu/logo.png?x_modules=12345
     * @param moduleName {String} Имя модуля в котором лежит изображение.
     * @param pathFile {String} Путь до изображения относительно папки images.
     * @param [version] {String} Версия cdn модуля. ModuleName/${version}/lang.
     */
    getImageUrl(moduleName: string, pathFile: string, version?: string): string {
        if (version) {
            return getResourceUrl(
                `/cdn/${moduleName}/${version}/lang/${this.currentLang}/images/${pathFile}`
            );
        }

        return getModuleUrl(`${moduleName}/lang/${this.currentLang}/images/${pathFile}`);
    }

    private readConfig(config: IConfigController): void {
        for (const nameOption of Object.keys(config)) {
            if (config[nameOption] !== undefined) {
                this[nameOption] = config[nameOption];
            }
        }
    }

    protected initStores(): void {
        this.localesStore = new Store<ILocale>(this.requiredLocales, (localeCode: string) => {
            return this.loader.locale(localeCode);
        });
        this.contextStore = new Store<IContext>([], (contextName) => {
            return this.loader.context(contextName, this.requiredLocales);
        });
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

            Promise.all([context, this.isReady()])
                .then(([contextContent]) => {
                    resolve(contextContent);
                })
                .catch(reject);
        });
    }

    private _calculateRegion(): string {
        const cookieRegion = cookie.get('region');

        if (cookieRegion) {
            return cookieRegion;
        }

        if (isInit() && location.hostname) {
            return location.hostname.split('.').pop().toUpperCase();
        }

        return 'RU';
    }

    private _calculateCodeLocale(): string {
        const langCookie = cookie.get('lang');

        if (langCookie && this._isSupportedLocale(langCookie)) {
            return langCookie;
        }

        const normalizedCodeFromCookie = this._normalizeCode(langCookie);

        if (normalizedCodeFromCookie && this._isSupportedLocale(normalizedCodeFromCookie)) {
            this.setLocale(normalizedCodeFromCookie);

            return normalizedCodeFromCookie;
        }

        const detectedCode = this._detectCodeFromAcceptLanguage(Controller.getAcceptLanguage());

        if (detectedCode && this._isSupportedLocale(detectedCode)) {
            this.setLocale(detectedCode);

            return detectedCode;
        }

        return this.defaultLocale;
    }

    private _detectCodeFromAcceptLanguage(acceptLanguage: string[]): string {
        if (this.availableLocales.length === 0) {
            return '';
        }

        for (const pieceHeader of acceptLanguage) {
            const code = pieceHeader.split(';')[0];

            if (Controller.isLocaleCode(code) && this._isSupportedLocale(code)) {
                return code;
            }

            if (Controller.isLangCode(code)) {
                const fullCode = this._getLocaleCodeByLang(code);

                if (fullCode) {
                    return fullCode;
                }
            }
        }
    }

    private _isSupportedLocale(code: string): boolean {
        return this.availableLocales.includes(code);
    }

    private _normalizeCode(code: string): string {
        if (typeof code === 'string') {
            if (Controller.isLocaleCode(code)) {
                return code;
            }

            return Controller.isLangCode(code) ? this._getLocaleCodeByLang(code) : '';
        }

        return '';
    }

    _getLocaleCodeByLang(langCode) {
        const priorityLocale = `${langCode}-${this.currentCountry}`;

        if (this.availableLocales.includes(priorityLocale)) {
            return priorityLocale;
        }

        for (const code of this.availableLocales) {
            if (code.startsWith(langCode)) {
                return code;
            }
        }

        return '';
    }

    /**
     * Возврашает языки из заголовка accept-language.
     * @param request Тело https запроса.
     * @example
     * В accept-language лежит en-US,en;q=0.9,ru;q=0.8.
     * <pre>
     *    Controller.getAcceptLanguage() // ['en-US', 'en;q=0.9', 'ru;q=0.8']
     * </pre>
     */
    static getAcceptLanguage(request?: IRequest): string[] {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const req =
            request || (typeof process === 'object' && process.domain && process.domain.req);
        const acceptLanguage = req && req.headers && req.headers['accept-language'];

        return acceptLanguage ? acceptLanguage.split(',') : [];
    }

    /**
     * Проверяет явлется ли строка кодом языка.
     * @param code Проверяемый код.
     * @example
     * <pre>
     *    Controller.isLangCode('en-US') // false
     *    Controller.isLangCode('en') // true
     *    Controller.isLangCode('gg') // true
     * </pre>
     */
    static isLangCode(code: string): boolean {
        return code.length === LENGTH_LANG_CODE;
    }

    /**
     * Проверяет явлется ли строка кодом локали.
     * @param code Проверяемый код.
     * @example
     * <pre>
     *    Controller.isLocaleCode('en') // false
     *    Controller.isLocaleCode('en-US') // true
     *    Controller.isLocaleCode('gg-gg') // true
     * </pre>
     */
    static isLocaleCode(code: string): boolean {
        return code.length === LENGTH_LOCALE_CODE;
    }
}

export default Controller;
