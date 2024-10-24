import IModule from './IModule';

/**
 * Интерфейс объектов, содержащие информацию о доступных ресурсах локализации для приложения.
 * @public
 * @author Кудрявцев И.С.
 */
export default interface IContents {
    buildnumber: string;
    modules: {
        [key: string]: IModule;
    };
    availableLanguage?: object;
    defaultLanguage?: string;
}
