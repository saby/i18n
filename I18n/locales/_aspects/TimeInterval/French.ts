import ITimeUnits, { TimeUnitsEntries } from '../../../interfaces/ITimeUnits';
import plural from '../Plural/English';

/**
 * Функция форматирования временного интервала в строку для английского языка.
 * @public
 * @author Кудрявцев И.С.
 */

const items = {
    short: {
        years: ['a', 'a'],
        months: ['moi', 'moi'],
        days: ['j', 'j'],
        hours: ['h', 'h'],
        minutes: ['min', 'min'],
        seconds: ['sec', 'sec'],
    },
    full: {
        years: ['année', 'années'],
        months: ['mois', 'mois'],
        days: ['jour', 'jours'],
        hours: ['heure', 'heures'],
        minutes: ['minute', 'minutes'],
        seconds: ['second', 'seconds'],
    },
};

export default (interval: ITimeUnits, short: boolean = false) => {
    const result = [];
    const units = short ? items.short : items.full;

    for (const [name, value] of Object.entries(interval) as TimeUnitsEntries) {
        const argv = units[name];

        result.push(`${value} ${plural(value, argv[0], argv[1])}`);
    }

    return result.join(' ');
};
