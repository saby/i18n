/**
 * Интерфейс конфигурации для денег.
 * @public
 * @author Кудрявцев И.С.
 */
export default interface IMoney {
    symbol: string;
    charCode: string;
    currency: string[];
    shortCurrency: string;
    superShortCurrency: string;
    currentCurrencyUnitDenominations: number[];
    subunit: string[];
    shortSubunit: string;
    superShortSubunit: string;
    currentCurrencySubunitDenominations: number[];
}
