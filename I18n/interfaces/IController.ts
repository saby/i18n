import ILocale from '../../locales/Interfaces/ILocale';

/**
 * Интерфейс класса для взаимодействия с механизмом локализации.
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
