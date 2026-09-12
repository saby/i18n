import IMoneyEntities from '../../../interfaces/IMoneyEntities';

/**
 * Описание названий денежных валют для греческого языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default class English implements IMoneyEntities {
    currency = {
        рубль: ['ρούβλι', 'ρούβλια'],
        тенге: ['τένγκε', 'τένγκε'],
        сум: ['Σομ', 'Σομ'],
        манат: ['μανάτ', 'μανάτ'],
    };

    shortCurrency = {
        руб: 'ρού',
        тнг: 'τέν',
        сум: 'Σομ',
        ман: 'μαν',
    };

    superShortCurrency = {
        р: 'ρ',
        т: 'τ',
        с: 'Σ',
        м: 'μ',
    };

    subunit = {
        копейка: ['καπίκι', 'καπίκια'],
        тиын: ['tiyn', 'tiyn'],
        тийин: ['τίγιιν', 'τίγιιν'],
        тенге: ['τένγκε', 'τένγκε'],
    };

    shortSubunit = {
        коп: 'καπ',
        тиын: 'tiy',
        тийин: 'τίγ',
        тен: 'τέν',
    };

    superShortSubunit = {
        к: 'κ',
        тиын: 't',
        т: 'τίγ',
        тен: 'τέν',
    };
}
