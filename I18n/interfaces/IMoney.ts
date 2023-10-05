/**
 * Интерфейс конфигурации для денег.
 * @public
 * @author Кудрявцев И.С.
 */
export default interface IMoney {
    symbol: string;
    currency: string[];
    shortCurrency: string;
    superShortCurrency: string;
    subunit: string[];
    shortSubunit: string;
    superShortSubunit: string;
}
