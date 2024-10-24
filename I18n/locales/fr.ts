import CalendarEntitiesAspect from './_aspects/CalendarEntities/French';
import MoneyEntities from './_aspects/MoneyEntities/French';
import pluralFunction from './_aspects/Plural/English';
import timeInterval from './_aspects/TimeInterval/French';

import ICalendarEntities from '../interfaces/ICalendarEntities';
import ITimeUnits from '../interfaces/ITimeUnits';
import ILangConfig from '../interfaces/ILangConfig';
import IMoneyEntities from '../interfaces/IMoneyEntities';
import { langCode, directionalityCode } from '../interfaces/IAvailableCodes';

/**
 * Конфигурация для французского языка.
 * @public
 * @author Кудрявцев И.С.
 */
class Fr implements ILangConfig {
    code: langCode = 'fr';
    directionality: directionalityCode = 'ltr';
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    moneyEntities: IMoneyEntities = new MoneyEntities();
    timeInterval: (interval: ITimeUnits, short: boolean) => string = timeInterval;
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
}

export default new Fr();
