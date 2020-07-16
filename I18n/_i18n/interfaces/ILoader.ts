import ILocale from '../../locales/Interfaces/ILocale';
import IContext from './IContext';
import ILoadingsHistory from './ILoadingsHistory';

/**
 * Интерфейс класса загрузчика для ресурсов локализации.
 * @interface I18n/_i18n/interfaces/ILoader
 * @public
 * @author Кудрявцев И.С.
 */
export default interface ILoader {
    history: ILoadingsHistory;
    locale(localeCode: string): Promise<ILocale>;
    context(contextName: string, requiredLocale: string[]): Promise<IContext>;
}
