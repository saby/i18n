import IMoneyEntities from '../../../interfaces/IMoneyEntities';

/**
 * Описание названий денежных валют для китайского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default class Chinese implements IMoneyEntities {
    currency = {
        рубль: ['卢布'],
        тенге: ['坚戈'],
        сум: ['苏姆'],
        манат: ['马纳特'],
    };

    shortCurrency = {
        руб: '卢布',
        тнг: '坚戈',
        сум: '苏姆',
        ман: '马纳特',
    };

    superShortCurrency = {
        р: '卢布',
        т: '坚戈',
        с: '苏姆',
        м: '马纳特',
    };

    subunit = {
        копейка: ['科佩克'],
        тиын: ['蒂恩'],
        тийин: ['蒂因'],
        тенге: ['坚戈'],
    };

    shortSubunit = {
        коп: '科佩克',
        тиын: '蒂恩',
        тийин: '蒂因',
        тен: '坚戈',
    };

    superShortSubunit = {
        к: '科佩克',
        тиын: '蒂恩',
        т: '蒂因',
        тен: '坚戈',
    };
}
