import DateAspect from './_aspects/Date/Russia';
import NumberAspect from './_aspects/Number/SABY';
import CalendarEntitiesAspect from './_aspects/CalendarEntities/Russian';
import Money from './_aspects/Money/Russia';
import pluralFunction from './_aspects/Plural/Russian';
import timeInterval from './_aspects/TimeInterval/Russian';

import ILocale from '../interfaces/ILocale';
import IDate from '../interfaces/IDate';
import INumber from '../interfaces/INumber';
import ICalendarEntities from '../interfaces/ICalendarEntities';
import ITimeUnits from '../interfaces/ITimeUnits';
import IMoney from '../interfaces/IMoney';

/**
 * Конфигурация для русской локали.
 * @public
 * @author Кудрявцев И.С.
 */
class RuRu implements ILocale {
    code: string = 'ru-RU';
    directionality: string = 'ltr';
    date: IDate = new DateAspect();
    number: INumber = new NumberAspect();
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    money: IMoney = new Money();
    timeInterval: (interval: ITimeUnits, short: boolean) => string = timeInterval;
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
}

export default new RuRu();
