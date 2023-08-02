import DateAspect from './_aspects/Date/Hebrew';
import NumberAspect from './_aspects/Number/SABY';
import CalendarEntitiesAspect from './_aspects/CalendarEntities/Hebrew';
import pluralFunction from './_aspects/Plural/Arabian';
import timeInterval from './_aspects/TimeInterval/Hebrew';
import Money from './_aspects/Money/Russia';

import ILocale from '../interfaces/ILocale';
import IDate from '../interfaces/IDate';
import INumber from '../interfaces/INumber';
import ICalendarEntities from '../interfaces/ICalendarEntities';
import ITimeUnits from '../interfaces/ITimeUnits';
import IMoney from '../interfaces/IMoney';

/**
 * Конфигурация для Ивритской локали.
 * @public
 * @author Кудрявцев И.С.
 */
class HeIl implements ILocale {
    code: string = 'he-IL';
    directionality: string = 'rtl';
    date: IDate = new DateAspect();
    number: INumber = new NumberAspect();
    money: IMoney = new Money();
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    timeInterval: (interval: ITimeUnits, short: boolean) => string = timeInterval;
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
}

export default new HeIl();
