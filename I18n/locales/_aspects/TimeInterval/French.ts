import ITimeUnits, { LiteralTimeFormat, TimeUnitsEntries } from '../../../interfaces/ITimeUnits';
import plural from '../Plural/English';

const items = {
    superShort: {
        years: ['a', 'a'],
        months: ['m', 'm'],
        weeks: ['sem', 'sem'],
        days: ['j', 'j'],
        hours: ['h', 'h'],
        minutes: ['m', 'm'],
        seconds: ['s', 's'],
    },
    short: {
        years: ['a', 'a'],
        months: ['m', 'm'],
        weeks: ['sem', 'sem'],
        days: ['j', 'j'],
        hours: ['h', 'h'],
        minutes: ['min', 'min'],
        seconds: ['s', 's'],
    },
    full: {
        years: ['an', 'ans'],
        months: ['mois', 'mois'],
        weeks: ['semaine', 'semaines'],
        days: ['jour', 'jours'],
        hours: ['heure', 'heures'],
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
