type currencyName = 'рубль' | 'тенге' | 'сум';
type shortCurrencyName = 'руб' | 'тнг' | 'сум';
type superShortCurrencyName = 'р' | 'т' | 'с';
type subunitName = 'копейка' | 'тиын' | 'тийин';
type shortSubunitName = 'коп' | 'тиын' | 'тийин';
type superShortSubunitName = 'к' | 'тиын' | 'т';

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
