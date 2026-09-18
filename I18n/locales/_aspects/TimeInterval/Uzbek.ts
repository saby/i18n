import ITimeUnits, { LiteralTimeFormat, TimeUnitsEntries } from '../../../interfaces/ITimeUnits';
import plural from '../Plural/Kazakh';

const items = {
    superShort: {
        years: ['y'],
        months: ['oy'],
        weeks: ['haf'],
        days: ['kun'],
        hours: ['s'],
        minutes: ['d'],
        seconds: ['son'],
    },
    short: {
        years: ['y'],
        months: ['oy'],
        weeks: ['haf'],
        days: ['kun'],
        hours: ['s'],
        minutes: ['daq'],
        seconds: ['son'],
    },
    full: {
        years: ['yil'],
        months: ['oy'],
        weeks: ['hafta'],
        days: ['kun'],
        hours: ['soat'],
        minutes: ['daqiqa'],
        seconds: ['soniya'],
    },
};

/**
 * Функция форматирования временного интервала в строку для узбекского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default (interval: ITimeUnits, format: LiteralTimeFormat = 'full') => {
    const result = [];
    const units = items[format];

    for (const [name, value] of Object.entries(interval) as TimeUnitsEntries) {
        const val = units[name];

        result.push(`${value} ${plural(value, val[0])}`);
    }

    return result.join(' ');
};
