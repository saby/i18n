/**
 * Интерфейс конфигурации для локализации числовых значений.
 * @public
 * @author Кудрявцев И.С.
 */
export default interface INumber {
    /**
     * Дробный разделитель.
     */
    fractionSeparator: string;

    /**
     * Разделитель триад.
     */
    triadDelimiter: string;
}
