/**
 * Интерфейс класса локализуемой строки.
 * @interface I18n/_i18n/interfaces/ITranslatableString
 * @extends String
 * @public
 * @author Кудрявцев И.С.
 */
export default interface ITranslatableString extends String {
    toJSON(): string;
}
