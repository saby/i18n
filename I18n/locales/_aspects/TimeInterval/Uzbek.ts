import ITimeUnits, { TimeUnitsEntries } from '../../../interfaces/ITimeUnits';
import plural from '../Plural/Kazakh';

const items = {
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
export default (interval: ITimeUnits, short: boolean = false) => {
    const result = [];
    const units = short ? items.short : items.full;

    for (const [name, value] of Object.entries(interval) as TimeUnitsEntries) {
        const val = units[name];

        result.push(`${value} ${plural(value, val[0])}`);
    }

    return result.join(' ');
};
