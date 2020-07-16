import ILocale from '../../locales/interfaces/ILocale';

/**
 * Интерфейс класса для взаимодействия с механизмом локализации.
 * @interface I18n/_i18n/interfaces/IController
 * @public
 * @author Кудрявцев И.С.
 */
export default interface IController {
    defaultLocale: string;
    defaultLang: string;
    currentLocale: string;
    currentLang: string;
    contextSeparator: string;
    pluralPrefix: string;
    pluralDelimiter: string;
    currentLocaleConfig: ILocale;
    isEnabled: boolean;
    isReady(): Promise<boolean>;
}
