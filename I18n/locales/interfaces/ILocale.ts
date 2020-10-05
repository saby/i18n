import INumber from './INumber';
import ICalendarEntities from './ICalendarEntities';
import IDate from './IDate';

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
     * Описание форматов отоброжения дат.
     */
    date: IDate;

    /**
     * Описание числовых конастан.
     */
    number: INumber;

    /**
     * Описание констан каледнарных значений.
     */
    calendarEntities: ICalendarEntities;

    /**
     * Плюральная функция.
     */
    plural: (pluralNumber: number, ...words: string[]) => string;
}
