import DateAspect from './_aspects/Date/Europe';
import NumberAspect from './_aspects/Number/Europe';
import CalendarEntitiesAspect from './_aspects/CalendarEntities/Russian';
import pluralFunction from './_aspects/Plural/Russian';

import ILocale from './Interfaces/ILocale';
import IDate from './Interfaces/IDate';
import INumber from './Interfaces/INumber';
import ICalendarEntities from './Interfaces/ICalendarEntities';

class EuropeRuDate extends DateAspect {
    shortQuarterFormat: string = 'QQr \'YY';
    fullDateDayOfWeekFormat: string = 'DD MMMMlo\'YY, ddddl';
    shortDateDayOfWeekFormat: string = 'DD MMMMlo, ddddl';
    fullDateFullMonthFormat: string = 'DD MMMMlo\'YY';
    fullDateFullMonthFullYearFormat: string = 'DD MMMMlo YYYY';
    fullDateShortMonthFormat: string = 'DD MMMl\'YY';
    fullDateShortMonthFullYearFormat: string = 'DD MMMl YYYY';
    fullMonthFormat: string = 'MMMM\'YY';
    shortDateFullMonthFormat: string = 'DD MMMMlo';
    shortDateShortMonthFormat: string = 'DD MMMl';
}

/**
 * Конфигурация для русской локали.
 * @class I18n/locales/ru-RU
 * @implements I18n/Interfaces/ILocale
 * @public
 * @author Кудрявцев И.С.
 */
class RURU implements ILocale {
    code: string = 'ru-RU';
    date: IDate = new EuropeRuDate();
    number: INumber = new NumberAspect();
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
}

export default new RURU();
