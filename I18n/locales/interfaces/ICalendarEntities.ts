/**
 * Интерфейс конфигурации для локализация календарнной обозначений(Дни недели, месяц, квартал).
 * @interface I18n/locales/interfaces/ICalendarEntities
 * @public
 * @author Кудрявцев И.С.
 */
export default interface ICalendarEntities {
   minDays: string[];
   shortDays: string[];
   longDays: string[];
   shortMonths: string[];
   longMonths: string[];
   ordinalMonths: string[];
   shortOrdinalMonths: string[];
   am: string;
   pm: string;
   minHalfYear: string;
   longHalfYear: string;
   minQuarter: string;
   shortQuarter: string;
   longQuarter: string;
   quarters: string[];
   longQuarters: string[];
}
