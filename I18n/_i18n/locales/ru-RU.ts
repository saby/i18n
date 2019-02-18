export default {
    /**
     * Для английской локали
     * @param num число
     * @param word1 слово для 1
     * @param word2 слово для нескольких
     * @returns {String}
     * @private
     */
    plural: (num, word1, word2, word3, word4) => {

        // если есть дробная часть
        if (num % 1 > 0) {
            return word4;
        }

        // если две последние цифры 11 ... 19
        num = num % 100;
        if (num >= 11 && num <= 19) {
            return word3;
        }

        // все остальные случаи - по последней цифре
        num = num % 10;

        if (num == 1) {
            return word1;
        }

        if (num == 2 || num == 3 || num == 4) {
            return word2;
        }

        return word3;
    },
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
}
