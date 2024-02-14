import CalendarEntitiesAspect from './_aspects/CalendarEntities/Arabian';
import MoneyEntities from './_aspects/MoneyEntities/Arabian';
import pluralFunction from './_aspects/Plural/Arabian';
import timeInterval from './_aspects/TimeInterval/Arabian';

import ICalendarEntities from '../interfaces/ICalendarEntities';
import ITimeUnits from '../interfaces/ITimeUnits';
import ILangConfig from '../interfaces/ILangConfig';
import IMoneyEntities from '../interfaces/IMoneyEntities';
import { langCode, directionalityCode } from '../interfaces/IAvailableCodes';

/**
 * Конфигурация для арабского языка.
 * @public
 * @author Кудрявцев И.С.
 */
class Ar implements ILangConfig {
    code: langCode = 'ar';
    directionality: directionalityCode = 'rtl';
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    moneyEntities: IMoneyEntities = new MoneyEntities();
    timeInterval: (interval: ITimeUnits, short: boolean) => string = timeInterval;
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
}

export default new Ar();
