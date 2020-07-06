import ILocale from '../../locales/Interfaces/ILocale';
import IContext from './IContext';

export interface ILoadingsHistory {
    contexts: {
        [name: string]: {
            [localeCode: string]: {
                dictionary?: string,
                style?: string
            }
        }
    };
    locales: string[];
    contents: string[];
}

export default interface ILoader {
    history: ILoadingsHistory;
    locale(localeCode: string): Promise<ILocale>;
    context(contextName: string, requiredLocale: string[]): Promise<IContext>;
}
