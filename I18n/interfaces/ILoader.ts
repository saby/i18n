import ILocale from './ILocale';
import IContext from './IContext';
import ILoadingsHistory from './ILoadingsHistory';

/**
 * Интерфейс класса загрузчика для ресурсов локализации.
 * @public
 * @author Кудрявцев И.С.
 */
export default interface ILoader {
    /**
     * Объект c именами загруженных ресурсов.
     */
    history: ILoadingsHistory;

    /**
     * Загружает конфигураци для локали.
     * @param localeCode Код локали для которой надо загрузить конфигурацию.
     * @param load Функция загрузчик.
     */
    locale(localeCode: string, load?: Function): Promise<ILocale>;

    /**
     * Загружает необходимые ресурсы для интерфейсного модуля.
     * @param contextName Имя интрефесного модуля.
     * @param requiredLocale Список локалей, для которых надо загрузить ресурсы.
     */
    context(contextName: string, requiredLocale: string[]): Promise<IContext>;
}
