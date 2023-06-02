import IMoney, { IMoneyEntities } from '../../../interfaces/IMoney';

export default class Russia implements IMoney {
    symbol: string = '₽';

    ru: IMoneyEntities = {
        currency: ['рубль', 'рубля', 'рублей', 'рубля'],
        shortCurrency: 'руб',
        superShortCurrency: 'р',
        subunit: ['копейка', 'копейки', 'копеек', 'копейки'],
        shortSubunit: 'коп',
        superShortSubunit: 'к'
    };

    kk: IMoneyEntities = {
        currency: ['рубль'],
        shortCurrency: 'руб',
        superShortCurrency: 'р',
        subunit: ['копейка'],
        shortSubunit: 'коп',
        superShortSubunit: 'к'
    };

    uz: IMoneyEntities = {
        currency: ['rubl'],
        shortCurrency: 'rub',
        superShortCurrency: 'r',
        subunit: ['tiyin'],
        shortSubunit: 'tiy',
        superShortSubunit: 't'
    };

    en: IMoneyEntities = {
        currency: ['ruble', 'rubles'],
        shortCurrency: 'rub',
        superShortCurrency: 'r',
        subunit: ['kopeck', 'kopecks'],
        shortSubunit: 'kop',
        superShortSubunit: 'k'
    };

    fr: IMoneyEntities = {
        currency: ['rouble', 'roubles'],
        shortCurrency: 'rou',
        superShortCurrency: 'r',
        subunit: ['kopeck', 'kopecks'],
        shortSubunit: 'kop',
        superShortSubunit: 'k'
    };

    ar: IMoneyEntities = {
        currency: ['روبل', 'روبل', 'روبل'],
        shortCurrency: 'روبل',
        superShortCurrency: 'روبل',
        subunit: ['كوبيك', 'كوبيل', 'كوبيل'],
        shortSubunit: 'كوبيك',
        superShortSubunit: 'كوبيك'
    };

    he: IMoneyEntities = {
        currency: ['רובל', 'רובל', 'רובל'],
        shortCurrency: 'רובל',
        superShortCurrency: 'רובל',
        subunit: ['קופיקות', 'קופיקות', 'קופיקות'],
        shortSubunit: 'קופיקות',
        superShortSubunit: 'קופיקות'
    };
}
