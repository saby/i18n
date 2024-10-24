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
        манат: ['manat'],
    };

    shortCurrency = {
        руб: 'rub',
        тнг: 'tng',
        сум: 'sum',
        ман: 'man',
    };

    superShortCurrency = {
        р: 'r',
        т: 't',
        с: 's',
        м: 'm',
    };

    subunit = {
        копейка: ['kopeck'],
        тиын: ['tiyn'],
        тийин: ['tiýin'],
        тенге: ['teňňe'],
    };

    shortSubunit = {
        коп: 'kop',
        тиын: 'tiyn',
        тийин: 'tiýin',
        тен: 'teňňe',
    };

    superShortSubunit = {
        к: 'k',
        тиын: 'tiyn',
        т: 't',
        тен: 'teňňe',
    };
}
