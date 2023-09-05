/**
 * Интерфейс объекта, содрежащий историю о загруженых ресурсах локализации.
 * @public
 * @author Кудрявцев И.С.
 */
export default interface ILoadingsHistory {
    contexts: {
        [name: string]: {
            [localeCode: string]: {
                dictionary?: string;
                style?: string;
            };
        };
    };
    locales: { [localeCode: string]: string };
    contents: { [moduleName: string]: string };
}
