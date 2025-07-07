import CalendarEntitiesAspect from './_aspects/CalendarEntities/Chinese';
import MoneyEntities from './_aspects/MoneyEntities/Chinese';
import pluralFunction from './_aspects/Plural/Kazakh';
import timeInterval from './_aspects/TimeInterval/Chinese';

import ICalendarEntities from '../interfaces/ICalendarEntities';
import ITimeUnits from '../interfaces/ITimeUnits';
import ILangConfig from '../interfaces/ILangConfig';
import IMoneyEntities from '../interfaces/IMoneyEntities';
import { langCode, directionalityCode } from '../interfaces/IAvailableCodes';
import IDate from '../interfaces/IDate';
// eslint-disable-next-line
// @ts-ignore
import { DateTimeFormats } from 'LocalizationConfigs/localization_configs/lang/zh.json';

/**
 * Конфигурация для китайского языка.
 * @public
 * @author Кудрявцев И.С.
 */
class Zh implements ILangConfig {
    code: langCode = 'zh';
    directionality: directionalityCode = 'ltr';
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    moneyEntities: IMoneyEntities = new MoneyEntities();
    timeInterval: (interval: ITimeUnits, short: boolean) => string = timeInterval;
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
    dateTimeFormat: IDate = DateTimeFormats;
}

export default new Zh();
