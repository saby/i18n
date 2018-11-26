/// <amd-module name="I18n/_i18n/locales" />
import i18n from './i18n'

/**
 * @public
 * @author Aleksey Maltsev.
 */

var locales = {
      'ru-RU': {
         minDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
         shortDays: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
         longDays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
         shortMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
         longMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
         ordinalMonths: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
         shortOrdinalMonths: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
         am: 'дп',
         pm: 'пп',
         minHalfYear: '$digit$s$ пл',
         longHalfYear: '$digit$s$ полугодие',
         minQuarter: '$digit$s$ кв',
         shortQuarter: '$digit$s$ квр',
         longQuarter: '$digit$s$ квартал',
         quarters: ['I', 'II', 'III', 'IV'],
         longQuarters: ['I квартал', 'II квартал', 'III квартал', 'IV квартал'],
         fullDateDayOfWeekFormat: 'DD MMMMlo\'YY, ddddl',
         fullDateFormat: 'DD.MM.YY',
         fullDateFullMonthFormat: 'DD MMMMlo\'YY',
         fullDateFullMonthFullYearFormat: 'DD MMMMlo YYYY',
         fullDateFullYearFormat: 'DD.MM.YYYY',
         fullDateShortMonthFormat: 'DD MMMl\'YY',
         fullDateShortMonthFullYearFormat: 'DD MMMl YYYY',
         fullHalfYearFormat: 'YYYYhr \'YY',
         fullMonthFormat: 'MMMM\'YY',
         fullQuarterFormat: 'QQQQr \'YY',
         fullTimeFormat: 'HH:mm:ss',
         shortDateDayOfWeekFormat: 'DD MMMMlo, ddddl',
         shortDateFormat: 'DD.MM',
         shortDateFullMonthFormat: 'DD MMMMlo',
         shortDateShortMonthFormat: 'DD MMMl',
         shortHalfYearFormat: 'YYhr \'YY',
         shortMonthFormat: 'MMM\'YY',
         shortQuarterFormat: 'QQr \'YY',
         shortTimeFormat: 'HH:mm',
         masks: {
            date: '%d.%m.%y',
            min: '%H:%M',
            sec: '%H:%M:%S',
            msec: '%H:%M:%S.%J'
         }
      },
      'en-US': {
         minDays: ['Su', 'Mo', 'To', 'We', 'Th', 'Fr', 'Sa'],
         shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
         longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
         shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
         longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
         ordinalMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
         shortOrdinalMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
         am: 'am',
         pm: 'pm',
         minHalfYear: '$digit$s$ hy',
         longHalfYear: '$digit$s$ half year',
         minQuarter: '$digit$s$ qt',
         shortQuarter: '$digit$s$ qtr',
         longQuarter: '$digit$s$ quarter',
         quarters: ['I', 'II', 'III', 'IV'],
         longQuarters: ['I quarter', 'II quarter', 'III quarter', 'IV quarter'],
         fullDateDayOfWeekFormat: 'dddd, DD MMMM\'YY',
         fullDateFormat: 'DD.MM.YY',
         fullDateFullMonthFormat: 'DD MMMM\'YY',
         fullDateFullMonthFullYearFormat: 'DD MMMM, YYYY',
         fullDateFullYearFormat: 'DD.MM.YYYY',
         fullDateShortMonthFormat: 'DD MMM\'YY',
         fullDateShortMonthFullYearFormat: 'DD MMM YYYY',
         fullHalfYearFormat: 'YYYYhr \'YY',
         fullMonthFormat: 'MMMM\'YY',
         fullQuarterFormat: 'QQQQr \'YY',
         fullTimeFormat: 'HH:mm:ss',
         shortDateDayOfWeekFormat: 'dddd, DD MMMM',
         shortDateFormat: 'DD.MM',
         shortDateFullMonthFormat: 'DD MMMM',
         shortDateShortMonthFormat: 'DD MMM',
         shortHalfYearFormat: 'YYhr \'YY',
         shortMonthFormat: 'MMM\'YY',
         shortQuarterFormat: 'QQQr \'YY',
         shortTimeFormat: 'HH:mm',
         masks: {
            date: '%m/%d/%y',
            min: '%I:%M %p',
            sec: '%I:%M:%S %p',
            msec: '%I:%M:%S.%J %p'
         }
      }
   },
   defaultLocale = 'ru-RU',
   current;

//Support deprecated constants
var toLower = function (str) {
   return str.toLowerCase();
};
var toUpper = function (str) {
   return str.toUpperCase();
};
var mapping = {
   '*': {
      days: 'shortDays',
      daysSmall: 'shortDays',
      months: 'shortMonths',
      longMonthsSmall: 'longMonths',
      monthsSmall: 'shortMonths',
      monthsBig: 'shortMonths|u',
      monthsWithDays: 'ordinalMonths',
      monthsSmallWithDays: 'shortOrdinalMonths'
   },
   'ru-RU': {
      days: 'minDays',
      daysSmall: 'minDays|l',
      longMonthsSmall: 'longMonths|l',
      monthsSmall: 'shortMonths|l',
      monthsWithDays: 'ordinalMonths|l'
   }
};
var localesCode = Object.keys(locales);
Object.keys(mapping['*']).forEach(function (key) {
   var commonValue = mapping['*'][key];
   localesCode.forEach(function (localeCode) {
      var data = String(mapping[localeCode] && mapping[localeCode][key] || commonValue).split('|');
      var value = locales[localeCode][data[0]];
      switch (data[1]) {
         case 'l':
            value = value.map(toLower);
            break;
         case 'u':
            value = value.map(toUpper);
            break;
      }
      locales[localeCode][key] = value;
   });
});

//Locale class

export default {
   get available() {
      return Object.keys(locales);
   },
   get current() {
      return current || (current = {
         get code() {
            var code = i18n.isEnabled() ? i18n.getLang() : '';
            if (code && code in locales) {
               return code;
            }
            return defaultLocale;
         },
         get config() {
            return locales[this.code];
         }
      });
   }
};
