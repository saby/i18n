import IDate from '../../../interfaces/IDate';
import Base from './Base';

/**
 * Описание форматов отображения дат в американской системе.
 * @author Кудрявцев И.С.
 * @private
 */
export default class USA extends Base implements IDate {
    fullDateFormat: string = 'MM/DD/YY';
    fullDateFullYearFormat: string = 'MM/DD/YYYY';
    shortDateFormat: string = 'MM/DD';
    fullDateDayOfWeekFormat: string = "dddd, MMMM D'YY";
    shortDateDayOfWeekFormat: string = 'dddd, MMMM D';
    shortDateDayOfShortWeekFormat: string = 'dd, MMMM D';
    shortDateDayOfShortWeekShortMonthFormat: string = 'dd, MMM D';
    fullDateFullMonthFormat: string = "MMMM D'YY";
    fullDateFullMonthFullYearFormat: string = 'MMMM D, YYYY';
    fullDateShortMonthFormat: string = "MMM D'YY";
    fullDateShortMonthFullYearFormat: string = 'MMM D, YYYY';
    fullMonthFormat: string = "MMMM'YY";
}
