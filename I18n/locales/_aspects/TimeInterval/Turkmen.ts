import ITimeUnits, { LiteralTimeFormat, TimeUnitsEntries } from '../../../interfaces/ITimeUnits';
import plural from '../Plural/Kazakh';

const items = {
    superShort: {
        years: ['ý'],
        months: ['aý'],
        weeks: ['hep'],
        days: ['gün'],
        hours: ['s'],
        minutes: ['m'],
        seconds: ['sek'],
    },
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

/**
 * Функция форматирования временного интервала в строку для казахского языка.
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
