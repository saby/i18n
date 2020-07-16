import IDictionary from './IDictionary';

/**
 * Интерфейс объектов, содержащие ресурсы для контеста локализации.
 * @interface I18n/_i18n/interfaces/IContext
 * @public
 * @author Кудрявцев И.С.
 */
export default interface IContext {
    [localeCode: string]: IDictionary;
}
