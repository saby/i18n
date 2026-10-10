import ITimeUnits, { LiteralTimeFormat, TimeUnitsEntries } from '../../../interfaces/ITimeUnits';
import plural from '../Plural/English';

const items = {
    superShort: {
        years: ['χρ', 'χρ'],
        months: ['μή', 'μή'],
        weeks: ['εβ', 'εβ'],
        days: ['μ', 'μ'],
        hours: ['ώ', 'ώ'],
        minutes: ['λ', 'λ'],
        seconds: ['δευ', 'δευ'],
    },
    short: {
        years: ['χρ', 'χρ'],
        months: ['μή', 'μή'],
        weeks: ['εβ', 'εβ'],
        days: ['μ', 'μ'],
        hours: ['ώ', 'ώ'],
        minutes: ['λεπ', 'λεπ'],
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
export default (interval: ITimeUnits, format: LiteralTimeFormat = 'full') => {
    const result = [];
    const units = items[format];

    for (const [name, value] of Object.entries(interval) as TimeUnitsEntries) {
        const argv = units[name];

        result.push(`${value} ${plural(value, argv[0], argv[1])}`);
    }

    return result.join(' ');
};
