import IMoneyEntities from '../../../interfaces/IMoneyEntities';

/**
 * Описание названий денежных валют для испанского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default class Spanish implements IMoneyEntities {
    currency = {
        рубль: ['rublo', 'rublos'],
        тенге: ['tenge', 'tenges'],
        сум: ['soum', 'soums'],
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
        копейка: ['kopek', 'kopeks'],
        тиын: ['moneda', 'monedas'],
        тийин: ['centavo', 'centavos'],
        тенге: ['tenge', 'tenges'],
    };

    shortSubunit = {
        коп: 'kop',
        тиын: 'mon',
        тийин: 'cen',
        тен: 'ten',
    };

    superShortSubunit = {
        к: 'k',
        тиын: 'm',
        т: 'c',
        тен: 't',
    };
}
