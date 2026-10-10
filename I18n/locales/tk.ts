import CalendarEntitiesAspect from './_aspects/CalendarEntities/Turkmen';
import MoneyEntities from './_aspects/MoneyEntities/Turkmen';
import pluralFunction from './_aspects/Plural/Kazakh';
import timeInterval from './_aspects/TimeInterval/Turkmen';

import ICalendarEntities from '../interfaces/ICalendarEntities';
import ITimeUnits, { LiteralTimeFormat } from '../interfaces/ITimeUnits';
import ILangConfig from '../interfaces/ILangConfig';
import IMoneyEntities from '../interfaces/IMoneyEntities';
import { langCode, directionalityCode } from '../interfaces/IAvailableCodes';

/**
 * Конфигурация для русского языка.
 * @public
 * @author Кудрявцев И.С.
 */
class Tk implements ILangConfig {
    code: langCode = 'tk';
    directionality: directionalityCode = 'ltr';
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    moneyEntities: IMoneyEntities = new MoneyEntities();
    timeInterval: (interval: ITimeUnits, format: LiteralTimeFormat) => string = timeInterval;
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
}

export default new Tk();
