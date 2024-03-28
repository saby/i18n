import CalendarEntitiesAspect from './_aspects/CalendarEntities/Hebrew';
import MoneyEntities from './_aspects/MoneyEntities/Hebrew';
import pluralFunction from './_aspects/Plural/Arabian';
import timeInterval from './_aspects/TimeInterval/Hebrew';

import ICalendarEntities from '../interfaces/ICalendarEntities';
import ITimeUnits from '../interfaces/ITimeUnits';
import ILangConfig from '../interfaces/ILangConfig';
import IMoneyEntities from '../interfaces/IMoneyEntities';
import { langCode, directionalityCode } from '../interfaces/IAvailableCodes';

/**
 * Конфигурация для ивритского языка.
 * @public
 * @author Кудрявцев И.С.
 */
class He implements ILangConfig {
    code: langCode = 'he';
    directionality: directionalityCode = 'rtl';
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    moneyEntities: IMoneyEntities = new MoneyEntities();
    timeInterval: (interval: ITimeUnits, short: boolean) => string = timeInterval;
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
}

export default new He();
