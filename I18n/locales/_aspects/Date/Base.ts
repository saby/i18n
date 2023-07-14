/**
 * Описание базовых форматов отображения дат.
 * @author Кудрявцев И.С.
 * @private
 */
export default class Base {
    fullHalfYearFormat: string = "YYYYhr'YY";
    fullQuarterFormat: string = "QQQQr'YY";
    fullTimeFormat: string = 'HH:mm:ss';
    shortHalfYearFormat: string = "YYhr'YY";
    shortQuarterFormat: string = "QQQr'YY";
    shortTimeFormat: string = 'HH:mm';
    shortMonthFormat: string = "MMM'YY";
    shortDateFullMonthFormat: string = 'D MMMM';
    shortDateShortMonthFormat: string = 'D MMM';
}
