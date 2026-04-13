import CalendarEntitiesAspect from './_aspects/CalendarEntities/English';
import MoneyEntities from './_aspects/MoneyEntities/English';
import pluralFunction from './_aspects/Plural/English';
import timeInterval from './_aspects/TimeInterval/English';

import ICalendarEntities from '../interfaces/ICalendarEntities';
import ITimeUnits from '../interfaces/ITimeUnits';
import ILangConfig from '../interfaces/ILangConfig';
import IMoneyEntities from '../interfaces/IMoneyEntities';
import { langCode, directionalityCode } from '../interfaces/IAvailableCodes';

/**
 * Конфигурация для английского языка.
 * @public
 * @author Кудрявцев И.С.
 */
class En implements ILangConfig {
    code: langCode = 'en';
    directionality: directionalityCode = 'ltr';
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    moneyEntities: IMoneyEntities = new MoneyEntities();
    timeInterval: (interval: ITimeUnits, short: boolean) => string = timeInterval;
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
}

export default new En();
