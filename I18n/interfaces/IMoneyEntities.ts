/**
 * Доступные имена валют
 */
export type currencyName = 'рубль' | 'тенге' | 'сум' | 'манат';
/**
 * Доступные короткие имена валют
 */
export type shortCurrencyName = 'руб' | 'тнг' | 'сум' | 'ман';
/**
 * Доступные супер короткие имена валют
 */
export type superShortCurrencyName = 'р' | 'т' | 'с' | 'м';
/**
 * Доступные имена копеек
 */
export type subunitName = 'копейка' | 'тиын' | 'тийин' | 'тенге';
/**
 * Доступные короткие имена копеек
 */
export type shortSubunitName = 'коп' | 'тиын' | 'тийин' | 'тен';
/**
 * Доступные супер короткие имена копеек
 */
export type superShortSubunitName = 'к' | 'тиын' | 'т' | 'тен';

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
