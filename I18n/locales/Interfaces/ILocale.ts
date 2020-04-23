import INumber from './INumber';
import ICalendarEntities from './ICalendarEntities';
import IDate from './IDate';

export default interface ILocale {
    code: string;
    date: IDate;
    number: INumber;
    calendarEntities: ICalendarEntities;
    plural: (pluralNumber: number, ...words: string[]) => string;
}
