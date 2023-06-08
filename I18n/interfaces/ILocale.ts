import INumber from './INumber';
import ICalendarEntities from './ICalendarEntities';
import ITimeUnits from './ITimeUnits';
import IDate from './IDate';
import IMoney from './IMoney';

/**
 * Интерфейс конфигурации локали.
 * @public
 * @author Кудрявцев И.С.
 */
export default interface ILocale {
    /**
     * Код локали.
     */
    code: string;

    /**
     * Направление контента.
     */
    directionality: string;

    /**
     * Описание форматов отображения дат.
     */
    date: IDate;

    /**
     * Описание числовых констант.
     */
    number: INumber;

    /**
     * Описание констант календарных значений.
     */
    calendarEntities: ICalendarEntities;

    /**
     * Описание констант денежных значений.
     */
    money: IMoney;

    /**
     * Функция форматирования временного интервала в строку.
     */
    timeInterval: (interval: ITimeUnits, short: boolean) => string;

    /**
     * Плюральная функция.
     */
    plural: (pluralNumber: number, ...words: string[]) => string;
}
