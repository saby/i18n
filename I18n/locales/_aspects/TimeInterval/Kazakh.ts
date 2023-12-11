import ITimeUnits from '../../../interfaces/ITimeUnits';
import plural from '../Plural/Kazakh';

/**
 * Функция форматирования временного интервала в строку для казахского языка.
 * @public
 * @author Кудрявцев И.С.
 */

const items = {
    short: {
        years: ['ж'],
        months: ['ай'],
        days: ['күн'],
        hours: ['сағ'],
        minutes: ['мин'],
        seconds: ['сек'],
    },
    full: {
        years: ['жыл'],
        months: ['ай'],
        days: ['күн'],
        hours: ['сағат'],
        minutes: ['минут'],
        seconds: ['секунд'],
    },
};

export default (interval: ITimeUnits, short: boolean = false) => {
    const result = [];
    const units = short ? items.short : items.full;

    for (const [name, value] of Object.entries(interval)) {
        const argv = units[name];

        result.push(`${value} ${plural(value, argv[0])}`);
    }

    return result.join(' ');
};
