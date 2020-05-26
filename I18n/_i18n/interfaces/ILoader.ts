import ILocale from '../../locales/Interfaces/ILocale';
import IContext from './IContext';

export default interface ILoader {
    locale(localeCode: string): Promise<ILocale>;
    context(contextName: string, requiredLocale: string[]): Promise<IContext>;
}
