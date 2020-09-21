/**
 * Описание базовых форматов отоброжения дат.
 * @class I18n/locales/_aspects/Date/Base
 * @author Кудрявцев И.С.
 */
export default class Base {
    fullHalfYearFormat: string = 'YYYYhr \'YY';
    fullQuarterFormat: string = 'QQQQr \'YY';
    fullTimeFormat: string = 'HH:mm:ss';
    shortHalfYearFormat: string = 'YYhr \'YY';
    shortQuarterFormat: string = 'QQQr \'YY';
    shortTimeFormat: string = 'HH:mm';
    shortMonthFormat: string = 'MMM\'YY';
    shortDateFullMonthFormat: string = 'DD MMMM';
    shortDateShortMonthFormat: string = 'DD MMM';
}
