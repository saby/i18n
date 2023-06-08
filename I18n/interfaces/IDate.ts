/**
 * Интерфейс конфигурации для локализации дат.
 * @public
 * @author Кудрявцев И.С.
 */
export default interface IDate {
    /**
     * Полная дата с двухсимвольным годом, 05.02.95
     */
    fullDateFormat: string;

    /**
     * Полная дата с четерёхсимвольным годом, 05.02.1995
     */
    fullDateFullYearFormat: string;

    /**
     * Дата без обозначения года.
     */
    shortDateFormat: string;

    /**
     * Полное название полугодия.
     */
    fullHalfYearFormat: string;

    /**
     * Полное название квратала.
     */
    fullQuarterFormat: string;

    /**
     * Полное отображение времени. Часы, минуты, секунды.
     */
    fullTimeFormat: string;

    /**
     * Короткое название полугодия.
     */
    shortHalfYearFormat: string;

    /**
     * Короткое название квратала.
     */
    shortQuarterFormat: string;

    /**
     * Короткое отображение времени. Часы, минуты.
     */
    shortTimeFormat: string;

    /**
     * Название дня недели и полная дата с названием месяца.
     */
    fullDateDayOfWeekFormat: string;

    /**
     * Название дня недели и дата с названием месяца без года.
     */
    shortDateDayOfWeekFormat: string;

    /**
     * Короткое название дня недели и дата с названием месяца без года.
     */
    shortDateDayOfShortWeekFormat: string;

    /**
     * Короткое название дня недели и дата с коротким названием месяца без года.
     */
    shortDateDayOfShortWeekShortMonthFormat: string;

    /**
     * Дата с названием месяца и двухсимвольным обозначением года.
     */
    fullDateFullMonthFormat: string;

    /**
     * Дата с названием месяца и четерёхсимвольным обозначением года.
     */
    fullDateFullMonthFullYearFormat: string;

    /**
     * Дата с коротким названием месяца и двухсимвольным обозначением года.
     */
    fullDateShortMonthFormat: string;

    /**
     * Дата с коротким названием месяца и четерёхсимвольным обозначением года.
     */
    fullDateShortMonthFullYearFormat: string;

    /**
     * Полное название месяца и двухсимвольное обозначение года.
     */
    fullMonthFormat: string;

    /**
     * Короткое название месяца и двухсимвольное обозначение года.
     */
    shortMonthFormat: string;

    /**
     * Дата с полным названем месяца без года.
     */
    shortDateFullMonthFormat: string;

    /**
     * Дата с коротким названем месяца без года.
     */
    shortDateShortMonthFormat: string;
}
