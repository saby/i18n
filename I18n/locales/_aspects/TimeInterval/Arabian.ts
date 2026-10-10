import ITimeUnits, { LiteralTimeFormat, TimeUnitsEntries } from '../../../interfaces/ITimeUnits';
import plural from '../Plural/Arabian';

const items = {
    superShort: {
        years: ['سنة', 'سنين', 'سنين'],
        months: ['شهر', 'الشهور', 'الشهور'],
        weeks: ['أسبوع', 'أسابيع', 'أسابيع'],
        days: ['يوم', 'أيام', 'أيام'],
        hours: ['ساعة', 'ساعات', 'ساعات'],
        minutes: ['اللحظة', 'الدقائق', 'الدقائق'],
        seconds: ['ثانيا', 'ثواني', 'ثواني'],
    },
    short: {
        years: ['سنة', 'سنين', 'سنين'],
        months: ['شهر', 'الشهور', 'الشهور'],
        weeks: ['أسبوع', 'أسابيع', 'أسابيع'],
        days: ['يوم', 'أيام', 'أيام'],
        hours: ['ساعة', 'ساعات', 'ساعات'],
        minutes: ['اللحظة', 'الدقائق', 'الدقائق'],
        seconds: ['ثانيا', 'ثواني', 'ثواني'],
    },
    full: {
        years: ['سنة', 'سنين', 'سنين'],
        months: ['شهر', 'الشهور', 'الشهور'],
        weeks: ['أسبوع', 'أسابيع', 'أسابيع'],
        days: ['يوم', 'أيام', 'أيام'],
        hours: ['ساعة', 'ساعات', 'ساعات'],
        minutes: ['اللحظة', 'الدقائق', 'الدقائق'],
        seconds: ['ثانيا', 'ثواني', 'ثواني'],
    },
};

/**
 * Функция форматирования временного интервала в строку для арабского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default (interval: ITimeUnits, format: LiteralTimeFormat = 'full') => {
    const result = [];
    const units = items[format];

    for (const [name, value] of Object.entries(interval) as TimeUnitsEntries) {
        const argv = units[name];

        result.push(`${value} ${plural(value, argv[0], argv[1], argv[2])}`);
    }

    return result.join(' ');
};
