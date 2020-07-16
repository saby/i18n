import DateAspect from './_aspects/Date/Europe';
import NumberAspect from './_aspects/Number/Europe';
import CalendarEntitiesAspect from './_aspects/CalendarEntities/English';
import pluralFunction from './_aspects/Plural/English';

import ILocale from './Interfaces/ILocale';
import IDate from './Interfaces/IDate';
import INumber from './Interfaces/INumber';
import ICalendarEntities from './Interfaces/ICalendarEntities';

/**
 * Конфигурация для англо-британской локали.
 * @class I18n/locales/en-GB
 * @implements I18n/Interfaces/ILocale
 * @public
 * @author Кудрявцев И.С.
 */
class ENGB implements ILocale {
    code: string = 'en-GB';
    date: IDate = new DateAspect();
    number: INumber = new NumberAspect();
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
}

export default new ENGB();
