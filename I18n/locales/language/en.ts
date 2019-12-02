export default {
   code: 'en',
   /**
    * Для английской локали
    * @param pluralNumber число
    * @param word1 слово для 1
    * @param word2 слово для нескольких
    * @returns {String}
    * @private
    */
   plural: (pluralNumber: number, word1: string, word2: string): string => {

      if (pluralNumber > 1 || pluralNumber === 0) {
         return word2;
      }

      return word1;
   },
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
   longQuarters: ['I quarter', 'II quarter', 'III quarter', 'IV quarter']
}
