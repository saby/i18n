import IDate from '../../../interfaces/IDate';
import Europe from './Europe';

/**
 * Описание форматов отображения дат в российской системе.
 * @author Кудрявцев И.С.
 * @private
 */
export default class Russia extends Europe implements IDate {
    shortQuarterFormat: string = "QQr'YY";
    fullDateDayOfWeekFormat: string = "D MMMMlo'YY, ddddl";
    shortDateDayOfWeekFormat: string = 'D MMMMlo, ddddl';
    shortDateDayOfShortWeekFormat: string = 'D MMMMlo, ddl';
    shortDateDayOfShortWeekShortMonthFormat: string = 'D MMMlo, ddl';
    fullDateFullMonthFormat: string = "D MMMMlo'YY";
    fullDateFullMonthFullYearFormat: string = 'D MMMMlo YYYY';
    fullDateShortMonthFormat: string = "D MMMlo'YY";
    fullDateShortMonthFullYearFormat: string = 'D MMMlo YYYY';
    fullMonthFormat: string = "MMMM'YY";
    shortDateFullMonthFormat: string = 'D MMMMlo';
    shortDateShortMonthFormat: string = 'D MMMlo';
}
