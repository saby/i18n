import ITimeUnits, { TimeUnitsEntries } from '../../../interfaces/ITimeUnits';
import plural from '../Plural/Arabian';

const items = {
    short: {
        years: ['שנה', 'שנים', 'שנים'],
        months: ['חוֹדֶשׁ', 'חודשים', 'חודשים'],
        weeks: ['שבוע', 'שבועות', 'שבועות'],
        days: ['יְוֹם', 'ימים', 'ימים'],
        hours: ['שָׁעָה', 'שעות', 'שעות'],
        minutes: ['דַקָה', 'דקות', 'דקות'],
        seconds: ['השני', 'שניות', 'שניות'],
    },
    full: {
        years: ['שנה', 'שנים', 'שנים'],
        months: ['חוֹדֶשׁ', 'חודשים', 'חודשים'],
        weeks: ['שבוע', 'שבועות', 'שבועות'],
        days: ['יְוֹם', 'ימים', 'ימים'],
        hours: ['שָׁעָה', 'שעות', 'שעות'],
        minutes: ['דַקָה', 'דקות', 'דקות'],
        seconds: ['השני', 'שניות', 'שניות'],
    },
};

/**
 * Функция форматирования временного интервала в строку для иврита.
 * @public
 * @author Кудрявцев И.С.
 */
export default (interval: ITimeUnits, short: boolean = false) => {
    const result = [];
    const units = short ? items.short : items.full;

    for (const [name, value] of Object.entries(interval) as TimeUnitsEntries) {
        const argv = units[name];

        result.push(`${value} ${plural(value, argv[0], argv[1], argv[2])}`);
    }

    return result.join(' ');
};
