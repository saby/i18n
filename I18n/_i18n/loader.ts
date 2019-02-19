//@ts-ignore
import {IoC} from 'Env/Env';

interface ILocale {
   plural: Function,
   minDays: [],
   shortDays: [],
   longDays: [],
   shortMonths: [],
   longMonths: [],
   ordinalMonths: [],
   shortOrdinalMonths: [],
   am: string,
   pm: string,
   minHalfYear: string,
   longHalfYear: string,
   minQuarter: string,
   shortQuarter: string,
   longQuarter: string,
   quarters: [],
   longQuarters: [],
   fullDateDayOfWeekFormat: string,
   fullDateFormat: string,
   fullDateFullMonthFormat: string,
   fullDateFullMonthFullYearFormat: string,
   fullDateFullYearFormat: string,
   fullDateShortMonthFormat: string,
   fullDateShortMonthFullYearFormat: string,
   fullHalfYearFormat: string,
   fullMonthFormat: string,
   fullQuarterFormat: string,
   fullTimeFormat: string,
   shortDateDayOfWeekFormat: string,
   shortDateFormat: string,
   shortDateFullMonthFormat: string,
   shortDateShortMonthFormat: string,
   shortHalfYearFormat: string,
   shortMonthFormat: string,
   shortQuarterFormat: string,
   shortTimeFormat: string,
   masks: object
}

export default (locale: string): Promise<ILocale> => {
   return import(`I18n/locales/${locale}`).then(
      settingLocal => settingLocal,
      err => {
         IoC.resolve('ILogger').error('Localization', `Для локали ${locale} не смог загрузить настройки.`);
      });
}
