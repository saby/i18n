import ITimeUnits, { TimeUnitsEntries } from '../../../interfaces/ITimeUnits';
import plural from '../Plural/Kazakh';

/**
 * Функция форматирования временного интервала в строку для казахского языка.
 * @public
 * @author Кудрявцев И.С.
 */

const items = {
    short: {
        years: ['ý'],
        months: ['aý'],
        weeks: ['hep'],
        days: ['gün'],
        hours: ['sag'],
        minutes: ['min'],
        seconds: ['sek'],
    },
    full: {
        years: ['ýyl'],
        months: ['aý'],
        weeks: ['hepde'],
        days: ['gün'],
        hours: ['sagat'],
        minutes: ['minut'],
        seconds: ['sekunt'],
    },
};

export default (interval: ITimeUnits, short: boolean = false) => {
    const result = [];
    const units = short ? items.short : items.full;

    for (const [name, value] of Object.entries(interval) as TimeUnitsEntries) {
        const argv = units[name];

        result.push(`${value} ${plural(value, argv[0])}`);
    }

    return result.join(' ');
};
