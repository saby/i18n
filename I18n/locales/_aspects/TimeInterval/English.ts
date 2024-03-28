import ITimeUnits, { TimeUnitsEntries } from '../../../interfaces/ITimeUnits';
import plural from '../Plural/English';

/**
 * Функция форматирования временного интервала в строку для английского языка.
 * @public
 * @author Кудрявцев И.С.
 */

const items = {
    short: {
        years: ['y', 'y'],
        months: ['mon', 'mon'],
        days: ['d', 'd'],
        hours: ['h', 'h'],
        minutes: ['min', 'min'],
        seconds: ['sec', 'sec'],
    },
    full: {
        years: ['year', 'years'],
        months: ['month', 'months'],
        days: ['day', 'days'],
        hours: ['hour', 'hours'],
        minutes: ['minute', 'minutes'],
        seconds: ['second', 'seconds'],
    },
};

export default (interval: ITimeUnits, short: boolean = false) => {
    const result = [];
    const units = short ? items.short : items.full;

    for (const [name, value] of Object.entries(interval) as TimeUnitsEntries) {
        const argv = units[name];

        result.push(`${value} ${plural(value, argv[0], argv[1])}`);
    }

    return result.join(' ');
};
