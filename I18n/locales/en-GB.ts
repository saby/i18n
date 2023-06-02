import DateAspect from './_aspects/Date/Europe';
import NumberAspect from './_aspects/Number/SABY';
import CalendarEntitiesAspect from './_aspects/CalendarEntities/English';
import pluralFunction from './_aspects/Plural/English';
import timeInterval from './_aspects/TimeInterval/English';
import Money from './_aspects/Money/Russia';

import ILocale from '../interfaces/ILocale';
import IDate from '../interfaces/IDate';
import INumber from '../interfaces/INumber';
import ICalendarEntities from '../interfaces/ICalendarEntities';
import ITimeUnits from '../interfaces/ITimeUnits';
import IMoney from '../interfaces/IMoney';

/**
 * Конфигурация для англо-британской локали.
 * @public
 * @author Кудрявцев И.С.
 */
class EnGb implements ILocale {
    code: string = 'en-GB';
    directionality: string = 'ltr';
    date: IDate = new DateAspect();
    number: INumber = new NumberAspect();
    money: IMoney = new Money();
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    timeInterval: (interval: ITimeUnits, short: boolean) => string = timeInterval;
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
}

export default new EnGb();
