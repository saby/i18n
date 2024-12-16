import CalendarEntitiesAspect from './_aspects/CalendarEntities/Greek';
import MoneyEntities from './_aspects/MoneyEntities/Greek';
import pluralFunction from './_aspects/Plural/English';
import timeInterval from './_aspects/TimeInterval/Greek';

import ICalendarEntities from '../interfaces/ICalendarEntities';
import ITimeUnits from '../interfaces/ITimeUnits';
import ILangConfig from '../interfaces/ILangConfig';
import IMoneyEntities from '../interfaces/IMoneyEntities';
import { langCode, directionalityCode } from '../interfaces/IAvailableCodes';

/**
 * Конфигурация для греческого языка.
 * @public
 * @author Кудрявцев И.С.
 */
class El implements ILangConfig {
    code: langCode = 'el';
    directionality: directionalityCode = 'ltr';
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    moneyEntities: IMoneyEntities = new MoneyEntities();
    timeInterval: (interval: ITimeUnits, short: boolean) => string = timeInterval;
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
}

export default new El();
