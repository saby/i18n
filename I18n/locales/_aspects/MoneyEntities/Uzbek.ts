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
        манат: ['manat'],
    };

    shortCurrency = {
        руб: 'rub',
        тнг: 'ten',
        сум: 'soʻm',
        ман: 'man',
    };

    superShortCurrency = {
        р: 'r',
        т: 't',
        с: 's',
        м: 'm',
    };

    subunit = {
        копейка: ['tiyin'],
        тиын: ['tanga'],
        тийин: ['tiyin'],
        тенге: ['tenge'],
    };

    shortSubunit = {
        коп: 'tiy',
        тиын: 'tan',
        тийин: 'tiy',
        тен: 'ten',
    };

    superShortSubunit = {
        к: 't',
        тиын: 'tan',
        т: 'tiy',
        тен: 'ten',
    };
}
