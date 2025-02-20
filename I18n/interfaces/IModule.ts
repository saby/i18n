/**
 * Интерфейс объектов, содержащие информацию о доступных ресурсах локализации для интрефейсного модуля.
 * @public
 * @author Кудрявцев И.С.
 */
export default interface IModule {
    buildnumber?: string;
    path?: string;
    dict?: string[];
    service?: string;
}
