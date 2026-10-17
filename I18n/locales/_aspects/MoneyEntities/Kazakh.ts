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
        манат: ['манат'],
    };

    shortCurrency = {
        руб: 'руб',
        тнг: 'тңг',
        сум: 'сом',
        ман: 'ман',
    };

    superShortCurrency = {
        р: 'р',
        т: 'т',
        с: 'c',
        м: 'м',
    };

    subunit = {
        копейка: ['копейка'],
        тиын: ['тиы́н'],
        тийин: ['тиы́н'],
        тенге: ['теңге'],
    };

    shortSubunit = {
        коп: 'коп',
        тиын: 'тиы́н',
        тийин: 'тиы́н',
        тен: 'тең',
    };

    superShortSubunit = {
        к: 'к',
        тиын: 'тиы́н',
        т: 'тиы́н',
        тен: 'тең',
    };
}
