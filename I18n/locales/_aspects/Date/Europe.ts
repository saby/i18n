import IDate from '../../Interfaces/IDate';
import Base from './Base';

/**
 * Описание форматов отоброжения дат в европейской системе.
 * @class I18n/locales/_aspects/Date/Europe
 * @extends I18n/locales/_aspects/Date/Base
 * @implements I18n/locales/Interfaces/IDate
 * @author Кудрявцев И.С.
 */
export default class Europe extends Base implements IDate {
    fullDateFormat: string = 'DD.MM.YY';
    fullDateFullYearFormat: string = 'DD.MM.YYYY';
    shortDateFormat: string = 'DD.MM';
    fullDateDayOfWeekFormat: string = 'dddd, DD MMMM\'YY';
    shortDateDayOfWeekFormat: string = 'dddd, DD MMMM';
    fullDateFullMonthFormat: string = 'DD MMMM\'YY';
    fullDateFullMonthFullYearFormat: string = 'DD MMMM, YYYY';
    fullDateShortMonthFormat: string = 'DD MMM\'YY';
    fullDateShortMonthFullYearFormat: string = 'DD MMM YYYY';
    fullMonthFormat: string = 'MMMM\'YY';
}
