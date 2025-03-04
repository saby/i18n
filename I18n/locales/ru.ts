import CalendarEntitiesAspect from './_aspects/CalendarEntities/Russian';
import MoneyEntities from './_aspects/MoneyEntities/Russian';
import pluralFunction from './_aspects/Plural/Russian';
import timeInterval from './_aspects/TimeInterval/Russian';

import ICalendarEntities from '../interfaces/ICalendarEntities';
import ITimeUnits from '../interfaces/ITimeUnits';
import ILangConfig from '../interfaces/ILangConfig';
import IMoneyEntities from '../interfaces/IMoneyEntities';
import { langCode, directionalityCode } from '../interfaces/IAvailableCodes';

/**
 * Конфигурация для русского языка.
 * @public
 * @author Кудрявцев И.С.
 */
class Ru implements ILangConfig {
    code: langCode = 'ru';
    directionality: directionalityCode = 'ltr';
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    moneyEntities: IMoneyEntities = new MoneyEntities();
    timeInterval: (interval: ITimeUnits, short: boolean) => string = timeInterval;
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
}

export default new Ru();
