import IMoney, {IMoneyEntities} from '../../../interfaces/IMoney';

export default class Uzbekistan implements IMoney {
    symbol: string = 'Soʻm';

    ru: IMoneyEntities = {
        currency: ['тенге', 'тенге', 'тенге', 'тенге'],
        shortCurrency: 'тнг',
        superShortCurrency: 'т',
        subunit: ['тиын', 'тиыни', 'тиыни', 'тиыня'],
        shortSubunit: 'тиын',
        superShortSubunit: 'тиын'
    };

    kk: IMoneyEntities = {
        currency: ['сом'],
        shortCurrency: 'сом',
        superShortCurrency: 'c',
        subunit: ['тиын'],
        shortSubunit: 'тиын',
        superShortSubunit: 'тиын'
    };

    uz: IMoneyEntities = {
        currency: ['soʻm'],
        shortCurrency: 'soʻm',
        superShortCurrency: 's',
        subunit: ['tiyin'],
        shortSubunit: 'tiy',
        superShortSubunit: 'tiy'
    };

    en: IMoneyEntities = {
        currency: ['soum', 'soumes'],
        shortCurrency: 'soum',
        superShortCurrency: 's',
        subunit: ['penny', 'pennies'],
        shortSubunit: 'pen',
        superShortSubunit: 'p'
    };

    fr: IMoneyEntities = {
        currency: ['soum', 'soumes'],
        shortCurrency: 'soum',
        superShortCurrency: 's',
        subunit: ['centime', 'centimes'],
        shortSubunit: 'cen',
        superShortSubunit: 'с'
    };

    ar: IMoneyEntities = {
        currency: ['سوم', 'سوم', 'سوم'],
        shortCurrency: 'تنغي',
        superShortCurrency: 'تنغي',
        subunit: ['تيين', 'تيين', 'تيين'],
        shortSubunit: 'تيين',
        superShortSubunit: 'تيين'
    };

    he: IMoneyEntities = {
        currency: ['סום', 'סום', 'סום'],
        shortCurrency: 'סום',
        superShortCurrency: 'סום',
        subunit: ['טיין', 'טיין', 'טיין'],
        shortSubunit: 'טיין',
        superShortSubunit: 'טיין'
    };
}
