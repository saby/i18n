import ITimeUnits, { TimeUnitsEntries } from '../../../interfaces/ITimeUnits';
import plural from '../Plural/English';

const items = {
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
export default (interval: ITimeUnits, short: boolean = false) => {
    const result = [];
    const units = short ? items.short : items.full;

    for (const [name, value] of Object.entries(interval) as TimeUnitsEntries) {
        const argv = units[name];

        result.push(`${value} ${plural(value, argv[0], argv[1])}`);
    }

    return result.join(' ');
};
