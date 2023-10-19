import constants from 'Env/Constants';
import { cookie } from 'Env/Env';
import { location as SBISLocation } from 'Application/Env';
import { isInit } from 'Application/Initializer';
import { getModuleUrl, getResourceUrl } from 'RequireJsLoader/conduct';

import Loader from './Loader';
import Store from './Store';
import Translator from './Translator';
import Locale from './Locale';

import IContext from '../interfaces/IContext';
import ILoader from '../interfaces/ILoader';
import IController from '../interfaces/IController';
import ILocale from '../interfaces/ILocale';
import ITranslator from '../interfaces/ITranslator';
import IStore from '../interfaces/IStore';
import ILoadingsHistory from '../interfaces/ILoadingsHistory';
import IModule from '../interfaces/IModule';
import ILangConfig from '../interfaces/ILangConfig';
import IRegionConfig from '../interfaces/IRegionConfig';
import { langCode, localeCode, regionCode } from '../interfaces/IAvailableCodes';

const LENGTH_LANG_CODE = 2;
const LENGTH_LOCALE_CODE = 5;
const EXPIRES_COOKIES = 365;

export interface IConfigController {
    availableRegions?: regionCode[];
    availableLanguages?: langCode[];
    defaultLanguage: langCode;
    availableContexts?: IModuleStore;
    loader?: ILoader;
}

interface IModuleStore {
    [contextName: string]: IModule;
}

interface IRequest {
    headers: {
        'accept-language': string;
    };
}

const LOCALE_BY_LANG = {
    en: 'en-US',
    fr: 'fr-FR',
    he: 'he-IL',
    ar: 'ar-AE',
    ru: 'ru-RU',
    uz: 'uz-UZ',
    kk: 'kk-KZ',
};

/**
 * Контролер для работы и взаимодействия с механизмом локализации.
 * @public
 * @author Кудрявцев И.С.
 */
class Controller implements IController {
    availableLocales: localeCode[] = [];
    availableLanguages: langCode[];
    availableRegions: regionCode[];
    translators: { [context: string]: ITranslator } = {};

    readonly defaultLanguage: langCode;

    /**
     * Загрузчик ресурсов локализации.
     */
    readonly loader: ILoader;
    ready: boolean = false;

    protected availableContexts: IModuleStore;
    protected currentLanguageCode: langCode;
    protected currentRegionCode: regionCode;
    protected regionStore: IStore<IRegionConfig>;
    protected languagesStore: IStore<ILangConfig>;
    protected contextStore: IStore<IContext>;
    protected localesStore: { [code: string]: ILocale };

    constructor(config: IConfigController) {
        this.defaultLanguage = config.defaultLanguage || 'ru';
        this.availableLanguages = config.availableLanguages || [];
        this.availableRegions = config.availableRegions || ['RU'];
        this.availableContexts = config.availableContexts || {};
        this.localesStore = {};
        this.loader = config.loader || new Loader(this.availableContexts);

        this.initStores();
    }

    get requiredLanguages(): langCode[] {
        if (!this.isEnabled) {
            return [this.defaultLanguage];
        }

        return constants.isServerSide ? this.availableLanguages : [this.currentLang];
    }

    get requiredRegions(): regionCode[] {
        return constants.isServerSide ? this.availableRegions : [this.currentCountry];
    }

    // TODO Когда закроют проект, эта реализация должна быть удалена, а currentLocaleNew переименован в currentLocale.
    //  https://online.sbis.ru/opendoc.html?guid=693d7c62-af3b-4246-a299-1aab884a4aaa&client=3,
    get currentLocale(): localeCode {
        return LOCALE_BY_LANG[this.currentLang] as localeCode;
    }

    get currentLocaleNew(): localeCode {
        return `${this.currentLang}-${this.currentCountry}`;
    }

    get currentLang(): langCode {
        if (!this.isEnabled) {
            return this.defaultLanguage;
        }

        if (constants.isBrowserPlatform) {
            if (!this.currentLanguageCode) {
                this.currentLanguageCode = this._calculateLanguageCode();
            }

            return this.currentLanguageCode;
        } else {
            return this._calculateLanguageCode();
        }
    }

    get currentCountry(): regionCode {
        if (constants.isBrowserPlatform) {
            if (!this.currentRegionCode) {
                this.currentRegionCode = this._calculateRegion();
            }

            return this.currentRegionCode;
        }

        return this._calculateRegion();
    }

    get loadingsHistory(): ILoadingsHistory {
        return this.loader.history;
    }

    get currentLocaleConfig(): ILocale {
        return this.localesStore[this.currentLocaleNew] || this._getAvailableConfig();
    }

    getCurrentLocaleConfig(): Promise<ILocale> {
        return this.isReady().then(() => {
            return this.currentLocaleConfig;
        });
    }

    get isEnabled(): boolean {
        return this.availableLanguages.length !== 0;
    }

    /**
     * Устанавливает код языка в куку lang.
     * @param {String} code Двухбуквенный код языка по стандарту ISO 639-1. Например: ru, en, kk и т.д.
     * @param {Number} [expires = 365] Время жизни куки.
     */
    setLang(code: langCode | string, expires: number = EXPIRES_COOKIES) {
        const langCode = this._normalizeCode(code);

        if (langCode && this._isSupportedLang(langCode)) {
            Controller.setCookie('lang', langCode, expires);
        }
    }

    /**
     * Проверяет, поддерживается ли языка.
     * @param code Код локали.
     */
    isSupportedLang(code: string): boolean {
        return this._isSupportedLang(this._normalizeCode(code));
    }

    // TODO Удалить, когда уберу все использование.
    setLocale(code: localeCode | string, expires: number = EXPIRES_COOKIES): void {
        this.setLang(code.split('-')[0] as langCode, expires);
    }

    // TODO Удалить, когда уберу все использование.
    isSupportedLocale(code: string): boolean {
        return this.isSupportedLang(code);
    }

    async isReady(): Promise<boolean> {
        if (!this.ready) {
            const languagesPrm = [];
            const regionsPrm = [];

            for (const languageCode of this.requiredLanguages) {
                languagesPrm.push(this.languagesStore.get(languageCode));
            }

            for (const regionCode of this.requiredRegions) {
                regionsPrm.push(this.regionStore.get(regionCode));
            }

            const [languages, regions] = await Promise.all([
                Promise.all(languagesPrm),
                Promise.all(regionsPrm),
            ]);

            this._synchronizeLocales(languages, regions);

            this.ready = true;
        }

        return true;
    }

    /**
     * Возврашает переводчик для контекста.
     * @param contextName Имя контекста.
     * @param sync Получить переводчик синхроно, если это первый запрос за ним, вернёт undefined.
     */
    getTranslator(contextName: string, sync: boolean = false): Promise<ITranslator> | ITranslator {
        if (this.translators.hasOwnProperty(contextName)) {
            return sync
                ? this.translators[contextName]
                : Promise.resolve(this.translators[contextName]);
        }

        if (sync) {
            this.translators[contextName] = new Translator({}, this);

            this._getContext(contextName).then((contextContent) => {
                this.translators[contextName].setDictionaries(contextContent);
            });

            return this.translators[contextName];
        }

        return this._getContext(contextName).then((contextContent) => {
            this.translators[contextName] = new Translator(contextContent, this);

            return this.translators[contextName];
        });
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
     * Добавляет конфигурацию для языка.
     * @param code Двухбуквенный код языка.
     * @param config Конфигурация языка.
     * @param isAvailable Надо ли добавить язык как доступный.
     */
    addLang(code: langCode, config: ILangConfig, isAvailable: boolean = true) {
        if (!this.availableLanguages.includes(code) && isAvailable) {
            this.availableLanguages.push(code);
        }

        this.languagesStore.set(code, config);
    }

    /**
     * Добавляет конфигурацию для языка.
     * @param code Двухбуквенный код региона.
     * @param config Конфигурация региона.
     * @param isAvailable Надо ли добавить регион как доступный.
     */
    addRegion(code: regionCode, config: IRegionConfig, isAvailable: boolean = true) {
        if (!this.availableRegions.includes(code) && isAvailable) {
            this.availableRegions.push(code);
        }

        this.regionStore.set(code, config);
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

    protected initStores(): void {
        this.contextStore = new Store<IContext>(
            [],
            (contextName) => this.loader.context(contextName, this.requiredLanguages),
            () => {}
        );
        this.languagesStore = new Store<ILangConfig>(
            this.requiredLanguages,
            (code: langCode) => this.loader.language(code),
            () => {
                this._synchronizeLocales();
            }
        );
        this.regionStore = new Store<IRegionConfig>(
            this.requiredRegions,
            (code: regionCode) => this.loader.region(code),
            () => {
                this._synchronizeLocales();
            }
        );
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

    private _getAvailableConfig(): ILocale {
        // TODO Сия код исполняется на билдере в воркере и там может случиться ситуация,
        //  что require за конфигами может без всяких ошибок вернуть undefined
        //  и тогда мы не создадим конфиг для локали. Но при этом есть сборка статичных страниц,
        //  где запрашивают конфиг локали и, если его нет,
        //  мы возвращаем undefined, что приводит к падению.
        //  Пока сделаем костыль, и будем возвращать первую доступную локаль из хранилища.
        //  Удалить, когда исправят билдер по задаче
        //  https://online.sbis.ru/opendoc.html?guid=372033f9-7ad5-4820-beba-4613c674ad74&client=3
        if (globalThis.wsConfig?.IS_BUILDER) {
            if (this.localesStore['ru-RU']) {
                return this.localesStore['ru-RU'];
            }

            return Object.values(this.localesStore)[0] || ({} as ILocale);
        }
    }

    private _getHost(): string {
        if (constants.isServerSide) {
            return isInit() ? SBISLocation.hostname : undefined;
        }

        return location.host;
    }

    private _calculateRegion(): regionCode {
        const cookieRegion = Controller.getCookie('region');

        if (cookieRegion && this.availableRegions.includes(cookieRegion as regionCode)) {
            return cookieRegion as regionCode;
        }

        const host = this._getHost();

        if (host) {
            const code = host.split('.').pop().toUpperCase() as regionCode;

            if (this.availableRegions.includes(code)) {
                return code;
            }
        }

        return 'RU';
    }

    private _calculateLanguageCode(): langCode {
        const langCookie = Controller.getCookie('lang') as langCode;

        if (langCookie && this._isSupportedLang(langCookie)) {
            return langCookie;
        }

        const normalizedCodeFromCookie = this._normalizeCode(langCookie);

        if (normalizedCodeFromCookie && this._isSupportedLang(normalizedCodeFromCookie)) {
            this.setLang(normalizedCodeFromCookie);

            return normalizedCodeFromCookie;
        }

        const detectedCode = this._detectCodeFromAcceptLanguage(Controller.getAcceptLanguage());

        if (detectedCode) {
            this.setLang(detectedCode);

            return detectedCode as langCode;
        }

        return this.defaultLanguage;
    }

    private _detectCodeFromAcceptLanguage(acceptLanguage: string[]): langCode {
        if (this.availableLanguages.length !== 0) {
            for (const pieceHeader of acceptLanguage) {
                let code = pieceHeader.split(';')[0] as langCode;

                if (Controller.isLocaleCode(code)) {
                    code = code.split('-')[0] as langCode;
                }

                if (this._isSupportedLang(code)) {
                    return code;
                }
            }
        }
    }

    private _isSupportedLang(code: langCode): boolean {
        return this.availableLanguages.includes(code);
    }

    private _normalizeCode(code: string): langCode {
        if (typeof code === 'string') {
            if (Controller.isLangCode(code)) {
                return code as langCode;
            }

            if (Controller.isLocaleCode(code)) {
                return code.split('-')[0] as langCode;
            }
        }
    }

    private _synchronizeLocales(
        languages: ILangConfig[] = Object.values(this.languagesStore.elements),
        regions: IRegionConfig[] = Object.values(this.regionStore.elements)
    ) {
        for (const region of regions) {
            if (!region) {
                continue;
            }

            for (const language of languages) {
                if (!languages) {
                    continue;
                }

                const code = `${language.code}-${region.code}` as localeCode;

                if (!this.localesStore.hasOwnProperty(code)) {
                    this.localesStore[code] = new Locale(code, language, region);
                }
            }
        }
    }

    static setCookie(name: string, value: string, expires: number = EXPIRES_COOKIES): void {
        cookie.set(name, value, {
            expires,
            path: '/',
        });
    }

    static getCookie(name: string): string {
        return cookie.get(name);
    }

    static removeCookie(name: string): void {
        cookie.set(name, null, {
            path: '/',
        });
    }

    /**
     * Возвращает языки из заголовка accept-language. Работает только на серверной стороне, функция смотрит в тело запроса.
     * Если тела запроса нет, вернёт пустой массив.
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
        const req = request || (typeof process === 'object' && process?.domain?.req);
        const acceptLanguage = req && req.headers && req.headers['accept-language'];

        return acceptLanguage ? acceptLanguage.split(',') : [];
    }

    /**
     * Проверяет является ли строка кодом языка.
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
     * Проверяет является ли строка кодом локали.
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
