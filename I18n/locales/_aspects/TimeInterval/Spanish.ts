import ITimeUnits, { LiteralTimeFormat, TimeUnitsEntries } from '../../../interfaces/ITimeUnits';
import plural from '../Plural/English';

const items = {
    superShort: {
        years: ['añ', 'añ'],
        months: ['me', 'me'],
        weeks: ['se', 'se'],
        days: ['d', 'd'],
        hours: ['h', 'h'],
        minutes: ['m', 'm'],
        seconds: ['seg', 'seg'],
    },
    short: {
        years: ['añ', 'añ'],
        months: ['me', 'me'],
        weeks: ['se', 'se'],
        days: ['d', 'd'],
        hours: ['h', 'h'],
        minutes: ['min', 'min'],
        seconds: ['seg', 'seg'],
    },
    full: {
        years: ['año', 'años'],
        months: ['mes', 'meses'],
        weeks: ['semana', 'semanas'],
        days: ['día', 'días'],
        hours: ['hora', 'horas'],
        minutes: ['minuto', 'minutos'],
        seconds: ['segundo', 'segundos'],
    },
};

/**
 * Функция форматирования временного интервала в строку для испанского языка.
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
