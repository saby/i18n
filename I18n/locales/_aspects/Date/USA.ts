import IDate from '../../Interfaces/IDate';
import Base from './Base';

/**
 * Описание форматов отоброжения дат в американской системе.
 * @class I18n/locales/_aspects/Date/USA
 * @extends I18n/locales/_aspects/Date/Base
 * @implements I18n/locales/Interfaces/IDate
 * @author Кудрявцев И.С.
 */
export default class USA extends Base implements IDate {
    fullDateFormat: string = 'MM/DD/YY';
    fullDateFullYearFormat: string = 'MM/DD/YYYY';
    shortDateFormat: string = 'MM/DD';
    fullDateDayOfWeekFormat: string = 'dddd, MMMM DD\'YY';
    shortDateDayOfWeekFormat: string = 'dddd, MMMM DD';
    fullDateFullMonthFormat: string = 'MMMM DD\'YY';
    fullDateFullMonthFullYearFormat: string = 'MMMM DD, YYYY';
    fullDateShortMonthFormat: string = 'MMM DD\'YY';
    fullDateShortMonthFullYearFormat: string = 'MMM DD, YYYY';
    fullMonthFormat: string = 'MMMM\'YY';
}
