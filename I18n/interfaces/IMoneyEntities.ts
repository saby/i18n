export type currencyName = 'рубль' | 'тенге' | 'сум';
export type shortCurrencyName = 'руб' | 'тнг' | 'сум';
export type superShortCurrencyName = 'р' | 'т' | 'с';
export type subunitName = 'копейка' | 'тиын' | 'тийин';
export type shortSubunitName = 'коп' | 'тиын' | 'тийин';
export type superShortSubunitName = 'к' | 'тиын' | 'т';

/**
 * Интерфейс конфигурации для денежных обозначений.
 * @public
 * @author Кудрявцев И.С.
 */
export default interface IMoneyEntities {
    currency: {
        [name in currencyName]: string[];
    };
    shortCurrency: {
        [name in shortCurrencyName]: string;
    };
    superShortCurrency: {
        [name in superShortCurrencyName]: string;
    };
    subunit: {
        [name in subunitName]: string[];
    };
    shortSubunit: {
        [name in shortSubunitName]: string;
    };
    superShortSubunit: {
        [name in superShortSubunitName]: string;
    };
}
