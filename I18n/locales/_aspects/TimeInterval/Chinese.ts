import ITimeUnits, { TimeUnitsEntries } from '../../../interfaces/ITimeUnits';
import plural from '../Plural/Kazakh';

const items = {
    short: {
        years: ['年'],
        months: ['个月'],
        weeks: ['周'],
        days: ['天'],
        hours: ['小时'],
        minutes: ['分'],
        seconds: ['秒'],
    },
    full: {
        years: ['年'],
        months: ['个月'],
        weeks: ['周'],
        days: ['天'],
        hours: ['小时'],
        minutes: ['分'],
        seconds: ['秒'],
    },
};

/**
 * Функция форматирования временного интервала в строку для китайского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default (interval: ITimeUnits, short: boolean = false) => {
    const result = [];
    const units = short ? items.short : items.full;

    for (const [name, value] of Object.entries(interval) as TimeUnitsEntries) {
        const argv = units[name];

        result.push(`${value} ${plural(value, argv[0])}`);
    }

    return result.join(' ');
};
