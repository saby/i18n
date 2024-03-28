import ITimeUnits, { TimeUnitsEntries } from '../../../interfaces/ITimeUnits';
import plural from '../Plural/Arabian';

/**
 * Функция форматирования временного интервала в строку для ивритского языка.
 * @public
 * @author Кудрявцев И.С.
 */

const items = {
    short: {
        years: ['سنة', 'سنين', 'سنين'],
        months: ['شهر', 'الشهور', 'الشهور'],
        days: ['يوم', 'أيام', 'أيام'],
        hours: ['ساعة', 'ساعات', 'ساعات'],
        minutes: ['اللحظة', 'الدقائق', 'الدقائق'],
        seconds: ['ثانيا', 'ثواني', 'ثواني'],
    },
    full: {
        years: ['سنة', 'سنين', 'سنين'],
        months: ['شهر', 'الشهور', 'الشهور'],
        days: ['يوم', 'أيام', 'أيام'],
        hours: ['ساعة', 'ساعات', 'ساعات'],
        minutes: ['اللحظة', 'الدقائق', 'الدقائق'],
        seconds: ['ثانيا', 'ثواني', 'ثواني'],
    },
};

export default (interval: ITimeUnits, short: boolean = false) => {
    const result = [];
    const units = short ? items.short : items.full;

    for (const [name, value] of Object.entries(interval) as TimeUnitsEntries) {
        const argv = units[name];

        result.push(`${value} ${plural(value, argv[0], argv[1], argv[2])}`);
    }

    return result.join(' ');
};
