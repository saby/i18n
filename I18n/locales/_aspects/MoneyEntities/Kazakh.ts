import IMoneyEntities from '../../../interfaces/IMoneyEntities';

/**
 * Описание названий денежных валют для казахского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default class Kazakh implements IMoneyEntities {
    currency = {
        рубль: ['рубль'],
        тенге: ['теңге'],
        сум: ['сом'],
    };

    shortCurrency = {
        руб: 'руб',
        тнг: 'тңг',
        сум: 'сом',
    };

    superShortCurrency = {
        р: 'р',
        т: 'т',
        с: 'c',
    };

    subunit = {
        копейка: ['копейка'],
        тиын: ['тиы́н'],
        тийин: ['тиы́н'],
    };

    shortSubunit = {
        коп: 'коп',
        тиын: 'тиы́н',
        тийин: 'тиы́н',
    };

    superShortSubunit = {
        к: 'к',
        тиын: 'тиы́н',
        т: 'тиы́н',
    };
}
