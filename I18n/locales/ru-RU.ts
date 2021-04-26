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
