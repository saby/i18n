import {constants, cookie} from 'Env/Env';

import Loader from './Loader';
import Store from './Store';
import Translator from './Translator';

import IContext from './../interfaces/IContext';
import ILoader from './../interfaces/ILoader';
import IController from './../interfaces/IController';
import ILocale from '../locales/interfaces/ILocale';
import ITranslator from './../interfaces/ITranslator';
import IStore from './../interfaces/IStore';
import ILoadingsHistory from './../interfaces/ILoadingsHistory';
import IModule from './../interfaces/IModule';

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

/**
 * Контролер для работы и взаимодействия с механизмом локализации.
 * @public
 * @author Кудрявцев И.С.
 */
class Controller implements IController {
    contextSeparator: string = '@@';
    pluralPrefix: string = 'plural#';
    pluralDelimiter: string = '|';

    /**
     * Дефолтная локаль приложения.
     */
    readonly defaultLocale: string = '';

    /**
     * Загрузчик ресурсов локализации.
     */
    readonly loader: ILoader;

    protected availableLocales: string[] = [];
    protected availableContexts: {[contextName: string]: IModule} = {};
    protected defaultLocalesFromLang: { [lang: string]: string } = {};
    protected currentCodeLocale: string = '';
    protected loadableTranslator: { [context: string]: Promise<ITranslator> } = {};
    protected translators: { [context: string]: ITranslator } = {};
    protected localesStore: IStore<ILocale>;
    protected contextStore: IStore<IContext>;

    constructor(config: IConfigController) {
        this.readConfig(config);

        this.buildMapOfDefaultLocales();

        this.loader = this.loader || new Loader(this.availableContexts);

        this.initStores();
    }

    protected get requiredLocales(): string[] {
        if (!this.isEnabled) {
            return [this.defaultLocale];
        }

        return constants.isServerSide ? this.availableLocales : [this.currentLocale];
    }

    /**
     * Дефолтный язык приложения.
     */
    get defaultLang(): string {
        return this.defaultLocale.split('-')[0];
    }

    /**
     * Код установленной локали приложения.
     * Если не удалось определить код локали или выключена локализация, вернёт дефолтную локаль.
     * @example
     * Приложение отображается в англо-амереканской локале.
     * <pre>
     *    controller.currentLocale === 'ru-RU' // false
     *    controller.currentLocale === 'en-US' // true
     * </pre>
     *
     * @example
     * Локализация выключена.
     * <pre>
     *    controller.currentLocale === 'ru-RU' // true
     * </pre>
     */
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

    /**
     * Установленный язык приложения.
     * Если не удалось определить код языка или выключена локализация, вернёт дефолтный язык.
     * @example
     * Приложение отображается в англо-амереканской локале.
     * <pre>
     *    controller.currentLang === 'ru' // false
     *    controller.currentLang === 'en-US' // false
     *    controller.currentLang === 'en' // true
     * </pre>
     *
     * @example
     * Локализация выключена.
     * <pre>
     *    controller.currentLang === 'ru' // true
     * </pre>
     */
    get currentLang(): string {
        return this.currentLocale.split('-')[0];
    }

    /**
     * История загрузки ресурсов локализации.
     */
    get loadingsHistory(): ILoadingsHistory {
        return this.loader.history;
    }

    /**
     * Конфигурация установленной локали прилолжения.
     */
    get currentLocaleConfig(): ILocale {
        return this.localesStore.get(this.currentLocale, true) as ILocale || {} as ILocale;
    }

    /**
     * Включена ли локализация.
     */
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
                path: '/'
            });

            this.currentCodeLocale = fullCode;
        }
    }

    /**
     * Проверяет поддерживается ли код локали или языка.
     * @param code Код локали.
     */
    isSupportedLocale(code: string): boolean {
        return this._isSupportedLocale(this._normalizeCode(code));
    }

    /**
     * Сигнализирует о готовности контролера.
     */
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

    /**
     * Возврашает переводчик для контекста.
     * @param contextName Имя контекста.
     * @param sync Получить переводчик синхроно, если это первый запрос за ним, вернёт undefined.
     */
    getTranslator(contextName: string, sync: boolean = false): Promise<ITranslator> | ITranslator {
        if (this.hasTranslator(contextName)) {
            delete this.loadableTranslator[contextName];

            return sync ? this.getSyncTranslator(contextName) : Promise.resolve(this.getSyncTranslator(contextName));
        }

        if (sync) {
            this.translators[contextName] = new Translator({}, this);

            if (!this.loadableTranslator.hasOwnProperty(contextName)) {
                this.loadableTranslator[contextName] = new Promise((resolve, reject) => {
                    this._getContext(contextName).then((contextContent) => {
                        this.getSyncTranslator(contextName).setDictionaries(contextContent);
                    }).catch(reject);
                });
            }

            return this.getSyncTranslator(contextName);
        }

        if (!this.loadableTranslator.hasOwnProperty(contextName)) {
            this.loadableTranslator[contextName] = new Promise((resolve, reject) => {
                this._getContext(contextName).then((contextContent) => {
                    this.translators[contextName] = new Translator(contextContent, this);

                    resolve(this.getSyncTranslator(contextName));
                }).catch(reject);
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
        if (isAvailable) {
            this.availableLocales.push(localeCode);
            this.buildMapOfDefaultLocales();
        }

        this.localesStore.set(localeCode, locale);
    }

    private readConfig(config: IConfigController): void {
        for (const nameOption of Object.keys(config)) {
            if (config[nameOption] !== undefined) {
                this[nameOption] = config[nameOption];
            }
        }
    }

    private initStores(): void {
        this.localesStore = new Store<ILocale>(
            this.requiredLocales,
            (localeCode: string) => this.loader.locale(localeCode)
        );
        this.contextStore = new Store<IContext>(
            [],
            (contextName) => this.loader.context(contextName, this.requiredLocales)
        );
    }

    private buildMapOfDefaultLocales(): void {
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
        // tslint:disable-next-line:ban-ts-ignore
        // @ts-ignore
        const req = request || process && process.domain && process.domain.req;
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
