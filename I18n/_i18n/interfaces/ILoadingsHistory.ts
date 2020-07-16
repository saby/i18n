/**
 * Интерфейс объекта, содрежащий историю о загруженых ресурсах локализации.
 * @interface I18n/_i18n/interfaces/ILoadingsHistory
 * @public
 * @author Кудрявцев И.С.
 */
export default interface ILoadingsHistory {
    contexts: {
        [name: string]: {
            [localeCode: string]: {
                dictionary?: string,
                style?: string
            }
        }
    };
    locales: string[];
    contents: string[];
}
