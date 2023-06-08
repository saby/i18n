import IDate from '../../../interfaces/IDate';
import Base from './Base';

/**
 * Описание форматов отображения дат в европейской системе.
 * @public
 * @author Кудрявцев И.С.
 */
export default class Hebrew extends Base implements IDate {
    fullHalfYearFormat: string = "YY'YYYYhr";
    fullQuarterFormat: string = "YY'QQQQr";
    shortHalfYearFormat: string = "YY'YYhr";
    shortQuarterFormat: string = "YY'QQQr";
    shortMonthFormat: string = "YY'MMM";

    fullDateFormat: string = 'DD/MM/YY';
    fullDateFullYearFormat: string = 'DD/MM/YYYY';
    shortDateFormat: string = 'DD.MM';
    fullDateDayOfWeekFormat: string = "D YY'MMMM, dddd";
    shortDateDayOfWeekFormat: string = 'D MMMM, dddd';
    shortDateDayOfShortWeekFormat: string = 'D MMMM, dd';
    shortDateDayOfShortWeekShortMonthFormat: string = 'D MMM, dd';
    fullDateFullMonthFormat: string = "D YY'MMMM";
    fullDateFullMonthFullYearFormat: string = 'D YYYY, MMMM';
    fullDateShortMonthFormat: string = "D YY'MMM";
    fullDateShortMonthFullYearFormat: string = 'D YYYY MMM';
    fullMonthFormat: string = "YY'MMMM";
}
