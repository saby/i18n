import DateAspect from './_aspects/Date/Russia';
import NumberAspect from './_aspects/Number/SABY';
import CalendarEntitiesAspect from './_aspects/CalendarEntities/Uzbek';
import pluralFunction from './_aspects/Plural/Kazakh';
import timeInterval from './_aspects/TimeInterval/Uzbek';
import Money from './_aspects/Money/Uzbekistan';

import ILocale from '../interfaces/ILocale';
import IDate from '../interfaces/IDate';
import INumber from '../interfaces/INumber';
import ICalendarEntities from '../interfaces/ICalendarEntities';
import ITimeUnits from '../interfaces/ITimeUnits';
import IMoney from '../interfaces/IMoney';

/**
 * Конфигурация для узбекской локали.
 * @public
 * @author Кудрявцев И.С.
 */
class UzUz implements ILocale {
    code: string = 'uz-UZ';
    directionality: string = 'ltr';
    date: IDate = new DateAspect();
    number: INumber = new NumberAspect();
    money: IMoney = new Money();
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    timeInterval: (interval: ITimeUnits, short: boolean) => string = timeInterval;
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
}

export default new UzUz();
