import IMoneyEntities from '../../../interfaces/IMoneyEntities';

/**
 * Описание названий денежных валют для арабского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default class French implements IMoneyEntities {
    currency = {
        рубль: ['روبل', 'روبل', 'روبل'],
        тенге: ['تنغي', 'تنغي', 'تنغي'],
        сум: ['سوم', 'سوم', 'سوم'],
    };

    shortCurrency = {
        руб: 'روبل',
        тнг: 'تنغي',
        сум: 'تنغي',
    };

    superShortCurrency = {
        р: 'روبل',
        т: 'تنغي',
        с: 'تنغي',
    };

    subunit = {
        копейка: ['كوبيك', 'كوبيل', 'كوبيل'],
        тиын: ['كوبيك', 'كوبيك', 'كوبيك'],
        тийин: ['تيين', 'تيين', 'تيين'],
    };

    shortSubunit = {
        коп: 'كوبيك',
        тиын: 'كوبيك',
        тийин: 'تيين',
    };

    superShortSubunit = {
        к: 'كوبيك',
        тиын: 'كوبيك',
        т: 'تيين',
    };
}
