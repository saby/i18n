import ILocale from './ILocale';
import ILoadingsHistory from './ILoadingsHistory';

/**
 * Интерфейс класса для взаимодействия с механизмом локализации.
 * @public
 * @author Кудрявцев И.С.
 */
export default interface IController {
    /**
     * Дефолтная локаль приложения.
     */
    defaultLocale: string;

    /**
     * Дефолтный язык приложения.
     */
    defaultLang: string;

    /**
     * Код установленной локали приложения.
     * Если не удалось определить код локали или выключена локализация, вернёт дефолтную локаль.
     * @example
     * Приложение отображается в англо-американской локале.
     * <pre>
     *    import { controller } from 'I18n/i18n';
     *
     *    controller.currentLocale === 'ru-RU' // false
     *    controller.currentLocale === 'en-US' // true
     * </pre>
     *
     * @example
     * Локализация выключена.
     * <pre>
     *    import { controller } from 'I18n/i18n';
     *
     *    controller.currentLocale === 'ru-RU' // true
     * </pre>
     */
    currentLocale: string;

    /**
     * Двухбуквенный код языка установленного в приложение.
     * Если не удалось определить код языка или выключена локализация, вернёт дефолтный язык.
     * @example
     * Приложение отображается в англо-амереканской локале.
     * <pre>
     *    import { controller } from 'I18n/i18n';
     *
     *    controller.currentLang === 'ru' // false
     *    controller.currentLang === 'en-US' // false
     *    controller.currentLang === 'en' // true
     * </pre>
     *
     * @example
     * Локализация выключена.
     * <pre>
     *    import { controller } from 'I18n/i18n';
     *
     *    controller.currentLang === 'ru' // true
     * </pre>
     */
    currentLang: string;

    /**
     * Двухбуквенный код страны установленной в приложение.
     * Если не удалось определить код страны или выключена локализация, вернёт дефолтный код.
     * @example
     * Приложение отображается в англо-американской локале.
     * <pre>
     *    import { controller } from 'I18n/i18n';
     *
     *    controller.currentCountry === 'en' // false
     *    controller.currentCountry === 'en-US' // false
     *    controller.currentCountry === 'US' // true
     * </pre>
     *
     * @example
     * Локализация выключена.
     * <pre>
     *    import { controller } from 'I18n/i18n';
     *
     *    controller.currentCountry === 'RU' // true
     * </pre>
     */
    currentCountry: string;

    /**
     * Разделитель контекста для ключей.
     */
    contextSeparator: string;

    /**
     * Плюральный префикс для ключей.
     */
    pluralPrefix: string;

    /**
     * Плюральный разделитель для ключей.
     */
    pluralDelimiter: string;

    /**
     * История загрузки ресурсов локализации.
     */
    loadingsHistory: ILoadingsHistory;

    /**
     * Включена ли локализация в приложение.
     */
    isEnabled: boolean;

    /**
     * Конфигурация установленной локали приложения.
     */
    currentLocaleConfig: ILocale;

    /**
     * Список кодов локалей доступных в приложение.
     * @example
     * Получить список доступных локалей.
     * <pre>
     *    import { controller } from 'I18n/i18n';
     *
     *    controller.availableLocales; // ['ru-RU', 'en-US']
     * </pre>
     */
    availableLocales: string[];

    /**
     * Сигнализирует о готовности контролера.
     */
    isReady(): Promise<boolean>;

    /**
     * Возвращает промис, которые вернёт конфиг установленной в приложении локали.
     * @example
     * Получить список месяцев в установленной локале.
     * <pre>
     *    import { controller } from 'I18n/i18n';
     *
     *    controller.getCurrentLocaleConfig().then((locale) => {
     *       const months = locale.calendarEntities.longMonths;
     *    });
     * </pre>
     */
    getCurrentLocaleConfig(): Promise<ILocale>;
}
