import IMoney, { IMoneyEntities } from '../../../interfaces/IMoney';

export default class Kazakhstan implements IMoney {
    symbol: string = '₸';

    ru: IMoneyEntities = {
        currency: ['тенге', 'тенге', 'тенге', 'тенге'],
        shortCurrency: 'тнг',
        superShortCurrency: 'т',
        subunit: ['тиын', 'тиыни', 'тиыни', 'тиыня'],
        shortSubunit: 'тиын',
        superShortSubunit: 'тиын',
    };

    kk: IMoneyEntities = {
        currency: ['теңге'],
        shortCurrency: 'тңг',
        superShortCurrency: 'т',
        subunit: ['Тиы́н'],
        shortSubunit: 'Тиы́н',
        superShortSubunit: 'Тиы́н',
    };

    uz: IMoneyEntities = {
        currency: ['tenge'],
        shortCurrency: 'ten',
        superShortCurrency: 't',
        subunit: ['tanga'],
        shortSubunit: 'tan',
        superShortSubunit: 'tan',
    };

    en: IMoneyEntities = {
        currency: ['tenge', 'tenges'],
        shortCurrency: 'rub',
        superShortCurrency: 'r',
        subunit: ['kopeck', 'kopecks'],
        shortSubunit: 'kop',
        superShortSubunit: 'k',
    };

    fr: IMoneyEntities = {
        currency: ['Tenge', 'tenges'],
        shortCurrency: 'ten',
        superShortCurrency: 't',
        subunit: ['centime', 'centimes'],
        shortSubunit: 'cen',
        superShortSubunit: 'с',
    };

    ar: IMoneyEntities = {
        currency: ['تنغي', 'تنغي', 'تنغي'],
        shortCurrency: 'تنغي',
        superShortCurrency: 'تنغي',
        subunit: ['كوبيك', 'كوبيك', 'كوبيك'],
        shortSubunit: 'كوبيك',
        superShortSubunit: 'كوبيك',
    };

    he: IMoneyEntities = {
        currency: ['טנגה', 'טנגה', 'טנגה'],
        shortCurrency: 'טנגה',
        superShortCurrency: 'טנגה',
        subunit: ['פרוטה', 'פרוטה', 'פרוטה'],
        shortSubunit: 'פרוטה',
        superShortSubunit: 'פרוטה',
    };
}
