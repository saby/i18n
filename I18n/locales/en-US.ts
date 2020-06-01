/*
import DateAspect from './_aspects/Date/USA';
import NumberAspect from './_aspects/Number/USA';
 */

import DateAspect from './_aspects/Date/Europe';
import NumberAspect from './_aspects/Number/Europe';
import CalendarEntitiesAspect from './_aspects/CalendarEntities/English';
import pluralFunction from './_aspects/Plural/English';

import ILocale from './Interfaces/ILocale';
import IDate from './Interfaces/IDate';
import INumber from './Interfaces/INumber';
import ICalendarEntities from './Interfaces/ICalendarEntities';

class ENUS implements ILocale {
    code: string = 'en-US';
    date: IDate = new DateAspect();
    number: INumber = new NumberAspect();
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
}

export default new ENUS();
