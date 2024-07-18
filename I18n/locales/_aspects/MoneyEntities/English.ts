import IMoneyEntities from '../../../interfaces/IMoneyEntities';

/**
 * Описание названий денежных валют для английского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default class English implements IMoneyEntities {
    currency = {
        рубль: ['ruble', 'rubles'],
        тенге: ['tenge', 'tenges'],
        сум: ['soum', 'soumes'],
    };

    shortCurrency = {
        руб: 'rub',
        тнг: 'ten',
        сум: 'soum',
    };

    superShortCurrency = {
        р: 'r',
        т: 't',
        с: 's',
    };

    subunit = {
        копейка: ['kopeck', 'kopecks'],
        тиын: ['tiyn', 'tiyns'],
        тийин: ['penny', 'pennies'],
    };

    shortSubunit = {
        коп: 'kop',
        тиын: 'tiy',
        тийин: 'pen',
    };

    superShortSubunit = {
        к: 'k',
        тиын: 't',
        т: 'p',
    };
}
