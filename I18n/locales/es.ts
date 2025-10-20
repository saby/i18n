import CalendarEntitiesAspect from './_aspects/CalendarEntities/Spanish';
import MoneyEntities from './_aspects/MoneyEntities/Spanish';
import pluralFunction from './_aspects/Plural/English';
import timeInterval from './_aspects/TimeInterval/Spanish';

import ICalendarEntities from '../interfaces/ICalendarEntities';
import ITimeUnits from '../interfaces/ITimeUnits';
import ILangConfig from '../interfaces/ILangConfig';
import IMoneyEntities from '../interfaces/IMoneyEntities';
import { langCode, directionalityCode } from '../interfaces/IAvailableCodes';
import IDate from '../interfaces/IDate';
// eslint-disable-next-line
// @ts-ignore
import { DateTimeFormats } from 'LocalizationConfigs/localization_configs/lang/es.json';

/**
 * Конфигурация для испанского языка.
 * @public
 * @author Кудрявцев И.С.
 */
class Es implements ILangConfig {
    code: langCode = 'es';
    directionality: directionalityCode = 'ltr';
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    moneyEntities: IMoneyEntities = new MoneyEntities();
    timeInterval: (interval: ITimeUnits, short: boolean) => string = timeInterval;
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
    dateTimeFormat: IDate = DateTimeFormats;
}

export default new Es();
