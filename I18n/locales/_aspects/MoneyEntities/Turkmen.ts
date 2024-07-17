import IMoneyEntities from '../../../interfaces/IMoneyEntities';

/**
 * Описание названий денежных валют для туркменского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default class Turkmen implements IMoneyEntities {
    currency = {
        рубль: ['rubly'],
        тенге: ['tenge'],
        сум: ['sum'],
    };

    shortCurrency = {
        руб: 'rub',
        тнг: 'tng',
        сум: 'sum',
    };

    superShortCurrency = {
        р: 'r',
        т: 't',
        с: 's',
    };

    subunit = {
        копейка: ['kopeck'],
        тиын: ['tiyn'],
        тийин: ['tiýin'],
    };

    shortSubunit = {
        коп: 'kop',
        тиын: 'tiyn',
        тийин: 'tiýin',
    };

    superShortSubunit = {
        к: 'k',
        тиын: 'tiyn',
        т: 't',
    };
}
