import CalendarEntitiesAspect from './_aspects/CalendarEntities/Kazakh';
import MoneyEntities from './_aspects/MoneyEntities/Kazakh';
import pluralFunction from './_aspects/Plural/Kazakh';
import timeInterval from './_aspects/TimeInterval/Kazakh';

import ICalendarEntities from '../interfaces/ICalendarEntities';
import ITimeUnits from '../interfaces/ITimeUnits';
import ILangConfig from '../interfaces/ILangConfig';
import IMoneyEntities from '../interfaces/IMoneyEntities';
import { langCode, directionalityCode } from '../interfaces/IAvailableCodes';

/**
 * Конфигурация для казахского языка.
 * @public
 * @author Кудрявцев И.С.
 */
class Kk implements ILangConfig {
    code: langCode = 'kk';
    directionality: directionalityCode = 'ltr';
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    moneyEntities: IMoneyEntities = new MoneyEntities();
    timeInterval: (interval: ITimeUnits, short: boolean) => string = timeInterval;
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
}

export default new Kk();
