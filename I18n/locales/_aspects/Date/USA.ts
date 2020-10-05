import IDate from '../../interfaces/IDate';
import Base from './Base';

/**
 * Описание форматов отоброжения дат в американской системе.
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
