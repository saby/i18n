export default {
   code: 'en-RU',
   pluralConstructor: {
      variable: ['pluralNumber', 'word1', 'word2'],
      body: `if (pluralNumber > 1 || pluralNumber === 0) {
         return word2;
      }

      return word1;`
   },
   minDays: ['Su', 'Mo', 'To', 'We', 'Th', 'Fr', 'Sa'],
   shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
   longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
   shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
   longMonths: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
   ],
   ordinalMonths: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
   ],
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
};
