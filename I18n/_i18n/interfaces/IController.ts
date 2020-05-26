import ILocale from '../../locales/Interfaces/ILocale';

export default interface IController {
    defaultLocale: string;
    defaultLang: string;
    currentLocale: string;
    contextSeparator: string;
    pluralPrefix: string;
    pluralDelimiter: string;
    currentLocaleConfig: ILocale;
}
