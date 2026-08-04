import ITimeUnits, { LiteralTimeFormat, TimeUnitsEntries } from '../../../interfaces/ITimeUnits';
import plural from '../Plural/English';

const items = {
    superShort: {
        years: ['yr', 'yr'],
        months: ['mo', 'mo'],
        weeks: ['wk', 'wk'],
        days: ['d', 'd'],
        hours: ['h', 'h'],
        minutes: ['m', 'm'],
        seconds: ['sec', 'sec'],
    },
    short: {
        years: ['yr', 'yr'],
        months: ['mo', 'mo'],
        weeks: ['wk', 'wk'],
        days: ['d', 'd'],
        hours: ['h', 'h'],
        minutes: ['min', 'min'],
        seconds: ['sec', 'sec'],
    },
    full: {
        years: ['year', 'years'],
        months: ['month', 'months'],
        weeks: ['week', 'weeks'],
        days: ['day', 'days'],
        hours: ['hour', 'hours'],
        minutes: ['minute', 'minutes'],
        seconds: ['second', 'seconds'],
    },
};

/**
 * Функция форматирования временного интервала в строку для английского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default (interval: ITimeUnits, format: LiteralTimeFormat = 'full') => {
    const result = [];
    const units = items[format];

    for (const [name, value] of Object.entries(interval) as TimeUnitsEntries) {
        const argv = units[name];

        result.push(`${value} ${plural(value, argv[0], argv[1])}`);
    }

    return result.join(' ');
};
