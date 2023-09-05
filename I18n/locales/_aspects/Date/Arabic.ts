import IDate from '../../../interfaces/IDate';
import Base from './Base';

/**
 * Описание форматов отображения дат в арабской системе.
 * @public
 * @author Кудрявцев И.С.
 */
export default class Arabic extends Base implements IDate {
    fullHalfYearFormat: string = "YY'YYYYhr";
    fullQuarterFormat: string = "YY'QQQQr";
    fullTimeFormat: string = 'HH:mm:ss';
    shortHalfYearFormat: string = "YY'YYhr";
    shortQuarterFormat: string = "YY'QQQr";
    shortTimeFormat: string = 'HH:mm';
    shortMonthFormat: string = "YY'MMM";
    shortDateFullMonthFormat: string = 'MMMM D';
    shortDateShortMonthFormat: string = 'MMM D';

    fullDateFormat: string = 'YY/MM/DD';
    fullDateFullYearFormat: string = 'YYYY/MM/DD';
    shortDateFormat: string = 'MM/DD';
    fullDateDayOfWeekFormat: string = "YY'MMMM D, dddd";
    shortDateDayOfWeekFormat: string = 'MMMM D, dddd';
    shortDateDayOfShortWeekFormat: string = 'MMMM D, dd';
    shortDateDayOfShortWeekShortMonthFormat: string = 'MMM D, dd';
    fullDateFullMonthFormat: string = "YY'MMMM D";
    fullDateFullMonthFullYearFormat: string = 'YYYY, MMMM D';
    fullDateShortMonthFormat: string = "YY'MMM D";
    fullDateShortMonthFullYearFormat: string = 'YYYY MMM D';
    fullMonthFormat: string = "YY'MMMM";
}
