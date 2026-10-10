import ITimeUnits, { LiteralTimeFormat, TimeUnitsEntries } from '../../../interfaces/ITimeUnits';
import plural from '../Plural/Kazakh';

const items = {
    superShort: {
        years: ['ж'],
        months: ['ай'],
        weeks: ['апта'],
        days: ['күн'],
        hours: ['с'],
        minutes: ['м'],
        seconds: ['сек'],
    },
    short: {
        years: ['ж'],
        months: ['ай'],
        weeks: ['апта'],
        days: ['күн'],
        hours: ['сағ'],
        minutes: ['мин'],
        seconds: ['сек'],
    },
    full: {
        years: ['жыл'],
        months: ['ай'],
        weeks: ['апта'],
        days: ['күн'],
        hours: ['сағат'],
        minutes: ['минут'],
        seconds: ['секунд'],
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
