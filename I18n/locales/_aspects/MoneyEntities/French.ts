import IMoneyEntities from '../../../interfaces/IMoneyEntities';

/**
 * Описание названий денежных валют для французского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default class French implements IMoneyEntities {
    currency = {
        рубль: ['rouble', 'roubles'],
        тенге: ['tenge', 'tenges'],
        сум: ['soum', 'soumes'],
        манат: ['manat', 'manats'],
    };

    shortCurrency = {
        руб: 'rou',
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
        тиын: ['centime', 'centimes'],
        тийин: ['centime', 'centimes'],
        тенге: ['tenge', 'tenges'],
    };

    shortSubunit = {
        коп: 'kop',
        тиын: 'cen',
        тийин: 'cen',
        тен: 'ten',
    };

    superShortSubunit = {
        к: 'k',
        тиын: 'c',
        т: 'c',
        тен: 'ten',
    };
}
