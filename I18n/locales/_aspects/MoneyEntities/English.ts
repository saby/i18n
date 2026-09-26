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
        манат: ['manat', 'manats'],
    };

    shortCurrency = {
        руб: 'rub',
        тнг: 'ten',
        сум: 'soum',
        ман: 'man',
    };

    superShortCurrency = {
        р: 'r',
        т: 't',
        с: 's',
        м: 'm',
    };

    subunit = {
        копейка: ['kopeck', 'kopecks'],
        тиын: ['tiyn', 'tiyns'],
        тийин: ['penny', 'pennies'],
        тенге: ['tenge', 'tenges'],
    };

    shortSubunit = {
        коп: 'kop',
        тиын: 'tiy',
        тийин: 'pen',
        тен: 'ten',
    };

    superShortSubunit = {
        к: 'k',
        тиын: 't',
        т: 'p',
        тен: 'ten',
    };
}
