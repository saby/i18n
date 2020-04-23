export default interface ICalendarEntities {
   plural: (pluralNumber: number, ...words: string[]) => string;
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
