import ITimeUnits, { LiteralTimeFormat, TimeUnitsEntries } from '../../../interfaces/ITimeUnits';
import plural from '../Plural/Kazakh';

const items = {
    superShort: {
        years: ['年'],
        months: ['个月'],
        weeks: ['周'],
        days: ['天'],
        hours: ['小时'],
        minutes: ['分'],
        seconds: ['秒'],
    },
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
export default (interval: ITimeUnits, format: LiteralTimeFormat = 'full') => {
    const result = [];
    const units = items[format];

    for (const [name, value] of Object.entries(interval) as TimeUnitsEntries) {
        const argv = units[name];

        result.push(`${value} ${plural(value, argv[0])}`);
    }

    return result.join(' ');
};
