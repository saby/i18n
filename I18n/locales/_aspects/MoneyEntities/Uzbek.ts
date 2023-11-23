import IMoneyEntities from '../../../interfaces/IMoneyEntities';

/**
 * Описание названий денежных валют для узбекского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default class Uzbek implements IMoneyEntities {
    currency = {
        рубль: ['rubl'],
        тенге: ['tenge'],
        сум: ['soʻm'],
    };

    shortCurrency = {
        руб: 'rub',
        тнг: 'ten',
        сум: 'soʻm',
    };

    superShortCurrency = {
        р: 'r',
        т: 't',
        с: 's',
    };

    subunit = {
        копейка: ['tiyin'],
        тиын: ['tanga'],
        тийин: ['tiyin'],
    };

    shortSubunit = {
        коп: 'tiy',
        тиын: 'tan',
        тийин: 'tiy',
    };

    superShortSubunit = {
        к: 't',
        тиын: 'tan',
        т: 'tiy',
    };
}
