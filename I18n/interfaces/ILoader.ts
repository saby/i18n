import IContext from './IContext';
import ILoadingsHistory from './ILoadingsHistory';
import IRegionConfig from './IRegionConfig';
import ILangConfig from './ILangConfig';
import { langCode, regionCode } from './IAvailableCodes';

/**
 * Интерфейс класса загрузчика для ресурсов локализации.
 * @public
 * @author Кудрявцев И.С.
 */
export default interface ILoader {
    /**
     * Объект с именами загруженных ресурсов.
     */
    history: ILoadingsHistory;

    /**
     * Загружает необходимые ресурсы для интерфейсного модуля.
     * @param contextName Имя интерфейсного модуля.
     * @param languageCode Список языков, для которых надо загрузить ресурсы.
     */
    context(contextName: string, languageCode: langCode[]): Promise<IContext>;

    /**
     * Загружает языковую конфигурацию.
     * @param code Код языка.
     */
    language(code: langCode): Promise<ILangConfig>;

    /**
     * Загружает региональную конфигурацию.
     * @param code Код региона.
     */
    region(code: regionCode): Promise<IRegionConfig>;
}
