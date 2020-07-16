import INumber from './INumber';
import ICalendarEntities from './ICalendarEntities';
import IDate from './IDate';

/**
 * Интерфейс конфигурации локали.
 * @interface I18n/locales/Interfaces/ILocale
 * @public
 * @author Кудрявцев И.С.
 */
export default interface ILocale {
    code: string;
    date: IDate;
    number: INumber;
    calendarEntities: ICalendarEntities;
    plural: (pluralNumber: number, ...words: string[]) => string;
}
