/**
 * Интерфейс объекта, содрежащий историю о загруженых ресурсах локализации.
 * @public
 * @author Кудрявцев И.С.
 */
export default interface ILoadingsHistory {
    contexts: {
        [name: string]: {
            [code: string]: {
                dictionary?: string;
                style?: string;
            };
        };
    };
    contents: { [moduleName: string]: string };
    languages: { [code: string]: string };
    regions: { [code: string]: string };
}
