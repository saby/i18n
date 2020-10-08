/*
import DateAspect from './_aspects/Date/USA';
import NumberAspect from './_aspects/Number/USA';
 */

import DateAspect from './_aspects/Date/Europe';
import NumberAspect from './_aspects/Number/Europe';
import CalendarEntitiesAspect from './_aspects/CalendarEntities/English';
import pluralFunction from './_aspects/Plural/English';

import ILocale from '../interfaces/ILocale';
import IDate from '../interfaces/IDate';
import INumber from '../interfaces/INumber';
import ICalendarEntities from '../interfaces/ICalendarEntities';

/**
 * Конфигурация для англо-американcкой локали.
 * @public
 * @author Кудрявцев И.С.
 */
class EnUs implements ILocale {
    code: string = 'en-US';
    date: IDate = new DateAspect();
    number: INumber = new NumberAspect();
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
}

export default new EnUs();
