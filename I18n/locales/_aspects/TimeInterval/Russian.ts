import ITimeUnits, { TimeUnitsEntries } from '../../../interfaces/ITimeUnits';
import plural from '../Plural/Russian';

const items = {
    short: {
        years: ['г', 'г', 'л', 'г'],
        months: ['мес', 'мес', 'мес', 'мес'],
        weeks: ['нед', 'нед', 'нед', 'нед'],
        days: ['дн', 'дн', 'дн', 'дн'],
        hours: ['ч', 'ч', 'ч', 'ч'],
        minutes: ['мин', 'мин', 'мин', 'мин'],
        seconds: ['сек', 'сек', 'сек', 'сек'],
    },
    full: {
        years: ['год', 'года', 'лет', 'года'],
        months: ['месяц', 'месяца', 'месяцев', 'месяца'],
        weeks: ['неделя', 'неделя', 'неделя', 'неделя'],
        days: ['день', 'дня', 'дней', 'дня'],
        hours: ['час', 'часа', 'часов', 'часа'],
        minutes: ['минута', 'минуты', 'минут', 'минуты'],
        seconds: ['секунда', 'секунды', 'секунда', 'секунд'],
    },
};

const thirdParam = 3;

/**
 * Функция форматирования временного интервала в строку для русского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default (interval: ITimeUnits, short: boolean = false) => {
    const result = [];
    const units = short ? items.short : items.full;

    for (const [name, value] of Object.entries(interval) as TimeUnitsEntries) {
        const argv = units[name];

        result.push(`${value} ${plural(value, argv[0], argv[1], argv[2], argv[thirdParam])}`);
    }

    return result.join(' ');
};
