/**
 * Интерфейс класса локализуемой строки.
 * @extends String
 * @public
 * @author Кудрявцев И.С.
 */
export default interface ITranslatableString extends String {
    toJSON(): string;
    i18n: boolean;
}
