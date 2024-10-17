import IDictionary from './IDictionary';

/**
 * Интерфейс объектов, содержащие ресурсы для контеста локализации.
 * @public
 * @author Кудрявцев И.С.
 */
export default interface IContext {
    [localeCode: string]: IDictionary;
}
