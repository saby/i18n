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
    };

    shortCurrency = {
        руб: 'rou',
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
        тиын: ['centime', 'centimes'],
        тийин: ['centime', 'centimes'],
    };

    shortSubunit = {
        коп: 'kop',
        тиын: 'cen',
        тийин: 'cen',
    };

    superShortSubunit = {
        к: 'k',
        тиын: 'c',
        т: 'c',
    };
}
