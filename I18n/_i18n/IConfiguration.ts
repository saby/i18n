interface IPluralConstructor {
   body: string,
   variable: Array<string>
}

export default interface IConfiguration {
   code: string;
   plural: Function;
   pluralConstructor: IPluralConstructor;
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
   fullDateDayOfWeekFormat: string;
   fullDateFormat: string;
   fullDateFullMonthFormat: string;
   fullDateFullMonthFullYearFormat: string;
   fullDateFullYearFormat: string;
   fullDateShortMonthFormat: string;
   fullDateShortMonthFullYearFormat: string;
   fullHalfYearFormat: string;
   fullMonthFormat: string;
   fullQuarterFormat: string;
   fullTimeFormat: string;
   shortDateDayOfWeekFormat: string;
   shortDateFormat: string;
   shortDateFullMonthFormat: string;
   shortDateShortMonthFormat: string;
   shortHalfYearFormat: string;
   shortMonthFormat: string;
   shortQuarterFormat: string;
   shortTimeFormat: string;
   masks: object;
}
