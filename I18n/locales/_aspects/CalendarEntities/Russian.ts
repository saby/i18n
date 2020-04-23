import ICalendarEntities from '../../Interfaces/ICalendarEntities';

export default class Russian implements ICalendarEntities {
    minDays: string[] = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    shortDays: string[] = ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'];
    longDays: string[] = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    shortMonths: string[] = [
       'Янв',
       'Фев',
       'Мар',
       'Апр',
       'Май',
       'Июн',
       'Июл',
       'Авг',
       'Сен',
       'Окт',
       'Ноя',
       'Дек'
    ];
    longMonths: string[] = [
       'Январь',
       'Февраль',
       'Март',
       'Апрель',
       'Май',
       'Июнь',
       'Июль',
       'Август',
       'Сентябрь',
       'Октябрь',
       'Ноябрь',
       'Декабрь'
    ];
    ordinalMonths: string[] = [
       'Января',
       'Февраля',
       'Марта',
       'Апреля',
       'Мая',
       'Июня',
       'Июля',
       'Августа',
       'Сентября',
       'Октября',
       'Ноября',
       'Декабря'
    ];
    shortOrdinalMonths: string[] = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    am: string = 'дп';
    pm: string  = 'пп';
    minHalfYear: string  = '$digit$s$ пл';
    longHalfYear: string  = '$digit$s$ полугодие';
    minQuarter: string  = '$digit$s$ кв';
    shortQuarter: string  = '$digit$s$ квр';
    longQuarter: string  = '$digit$s$ квартал';
    quarters: string[] = ['I', 'II', 'III', 'IV'];
    longQuarters: string[] = ['I квартал', 'II квартал', 'III квартал', 'IV квартал'];

    plural(pluralNumber: number, word1: string, word2: string, word3: string, word4: string): string {

        // если есть дробная часть
        if (pluralNumber % 1 > 0) {
            return word4;
        }

        // если две последние цифры 11 ... 19
        pluralNumber = pluralNumber % 100;
        if (pluralNumber >= 11 && pluralNumber <= 19) {
            return word3;
        }

        // все остальные случаи - по последней цифре
        pluralNumber = pluralNumber % 10;

        if (pluralNumber === 1) {
            return word1;
        }

        if (pluralNumber === 2 || pluralNumber === 3 || pluralNumber === 4) {
            return word2;
        }

        return word3;
    }
}
