import CalendarEntitiesAspect from './_aspects/CalendarEntities/Uzbek';
import MoneyEntities from './_aspects/MoneyEntities/Uzbek';
import pluralFunction from './_aspects/Plural/Kazakh';
import timeInterval from './_aspects/TimeInterval/Uzbek';

import ICalendarEntities from '../interfaces/ICalendarEntities';
import ITimeUnits, { LiteralTimeFormat } from '../interfaces/ITimeUnits';
import ILangConfig from '../interfaces/ILangConfig';
import IMoneyEntities from '../interfaces/IMoneyEntities';
import { langCode, directionalityCode } from '../interfaces/IAvailableCodes';

/**
 * Конфигурация для узбекского языка.
 * @public
 * @author Кудрявцев И.С.
 */
class Uz implements ILangConfig {
    code: langCode = 'uz';
    directionality: directionalityCode = 'ltr';
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    moneyEntities: IMoneyEntities = new MoneyEntities();
    timeInterval: (interval: ITimeUnits, format: LiteralTimeFormat) => string = timeInterval;
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
}

export default new Uz();
