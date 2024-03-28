import IMoneyEntities from '../../../interfaces/IMoneyEntities';

/**
 * Описание названий денежных валют для иврита.
 * @public
 * @author Кудрявцев И.С.
 */
export default class French implements IMoneyEntities {
    currency = {
        рубль: ['רובל', 'רובל', 'רובל'],
        тенге: ['טנגה', 'טנגה', 'טנגה'],
        сум: ['סום', 'סום', 'סום'],
    };

    shortCurrency = {
        руб: 'רובל',
        тнг: 'טנגה',
        сум: 'סום',
    };

    superShortCurrency = {
        р: 'רובל',
        т: 'טנגה',
        с: 'סום',
    };

    subunit = {
        копейка: ['קופיקות', 'קופיקות', 'קופיקות'],
        тиын: ['פרוטה', 'פרוטה', 'פרוטה'],
        тийин: ['טיין', 'טיין', 'טיין'],
    };

    shortSubunit = {
        коп: 'קופיקות',
        тиын: 'פרוטה',
        тийин: 'טיין',
    };

    superShortSubunit = {
        к: 'קופיקות',
        тиын: 'פרוטה',
        т: 'טיין',
    };
}
