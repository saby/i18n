import DateAspect from './_aspects/Date/Europe';
import NumberAspect from './_aspects/Number/SABY';
import CalendarEntitiesAspect from './_aspects/CalendarEntities/Russian';
import pluralFunction from './_aspects/Plural/Russian';

import ILocale from '../interfaces/ILocale';
import IDate from '../interfaces/IDate';
import INumber from '../interfaces/INumber';
import ICalendarEntities from '../interfaces/ICalendarEntities';

class EuropeRuDate extends DateAspect {
    shortQuarterFormat: string = 'QQr\'YY';
    fullDateDayOfWeekFormat: string = 'D MMMMlo\'YY, ddddl';
    shortDateDayOfWeekFormat: string = 'D MMMMlo, ddddl';
    fullDateFullMonthFormat: string = 'D MMMMlo\'YY';
    fullDateFullMonthFullYearFormat: string = 'D MMMMlo YYYY';
    fullDateShortMonthFormat: string = 'D MMMlo\'YY';
    fullDateShortMonthFullYearFormat: string = 'D MMMlo YYYY';
    fullMonthFormat: string = 'MMMM\'YY';
    shortDateFullMonthFormat: string = 'D MMMMlo';
    shortDateShortMonthFormat: string = 'D MMMlo';
}

/**
 * Конфигурация для русской локали.
 * @public
 * @author Кудрявцев И.С.
 */
class RuRu implements ILocale {
    code: string = 'ru-RU';
    date: IDate = new EuropeRuDate();
    number: INumber = new NumberAspect();
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
}

export default new RuRu();
