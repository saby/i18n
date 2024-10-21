import ITimeUnits, { TimeUnitsEntries } from '../../../interfaces/ITimeUnits';
import plural from '../Plural/English';

const items = {
    short: {
        years: ['χρ', 'χρ'],
        months: ['μή', 'μή'],
        weeks: ['εβ', 'εβ'],
        days: ['μ', 'μ'],
        hours: ['ώ', 'ώ'],
        minutes: ['λεπ', 'min'],
        seconds: ['δευ', 'δευ'],
    },
    full: {
        years: ['χρόνος', 'χρόνια'],
        months: ['μήνας', 'μήνες'],
        weeks: ['εβδομάδα', 'εβδομάδες'],
        days: ['μέρα', 'ημέρες'],
        hours: ['ώρα', 'ώρες'],
        minutes: ['λεπτό', 'λεπτά'],
        seconds: ['δευτερόλεπτο', 'δευτερόλεπτα'],
    },
};

/**
 * Функция форматирования временного интервала в строку для греческого языка.
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
