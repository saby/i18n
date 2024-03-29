import ITimeUnits from '../../../interfaces/ITimeUnits';
import plural from '../Plural/Arabian';

/**
 * Функция форматирования временного интервала в строку для арабского языка.
 * @public
 * @author Кудрявцев И.С.
 */

const items = {
    short: {
        years: ['שנה', 'שנים', 'שנים'],
        months: ['חוֹדֶשׁ', 'חודשים', 'חודשים'],
        days: ['יְוֹם', 'ימים', 'ימים'],
        hours: ['שָׁעָה', 'שעות', 'שעות'],
        minutes: ['דַקָה', 'דקות', 'דקות'],
        seconds: ['השני', 'שניות', 'שניות'],
    },
    full: {
        years: ['שנה', 'שנים', 'שנים'],
        months: ['חוֹדֶשׁ', 'חודשים', 'חודשים'],
        days: ['יְוֹם', 'ימים', 'ימים'],
        hours: ['שָׁעָה', 'שעות', 'שעות'],
        minutes: ['דַקָה', 'דקות', 'דקות'],
        seconds: ['השני', 'שניות', 'שניות'],
    },
};

export default (interval: ITimeUnits, short: boolean = false) => {
    const result = [];
    const units = short ? items.short : items.full;

    for (const [name, value] of Object.entries(interval)) {
        const argv = units[name];

        result.push(`${value} ${plural(value, argv[0], argv[1], argv[2])}`);
    }

    return result.join(' ');
};
