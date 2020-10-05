/**
 * Интерфейс конфигурации для локализация дат.
 * @public
 * @author Кудрявцев И.С.
 */
export default interface IDate {
    fullDateFormat: string;
    fullDateFullYearFormat: string;
    shortDateFormat: string;
    fullHalfYearFormat: string;
    fullQuarterFormat: string;
    fullTimeFormat: string;
    shortHalfYearFormat: string;
    shortQuarterFormat: string;
    shortTimeFormat: string;
    fullDateDayOfWeekFormat: string;
    shortDateDayOfWeekFormat: string;
    fullDateFullMonthFormat: string;
    fullDateFullMonthFullYearFormat: string;
    fullDateShortMonthFormat: string;
    fullDateShortMonthFullYearFormat: string;
    fullMonthFormat: string;
    shortMonthFormat: string;
    shortDateFullMonthFormat: string;
    shortDateShortMonthFormat: string;
}
