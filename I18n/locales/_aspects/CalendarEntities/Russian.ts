import ICalendarEntities from '../../../interfaces/ICalendarEntities';

/**
 * Описание констан каледнарных значений для русского языка.
 * @public
 * @author Кудрявцев И.С.
 */
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
    today: string = 'Сегодня';
    allPeriod: string = 'Весь период';
    openFinishPeriod: string  = 'с $digit$s$';
    openStartPeriod: string  = 'по $digit$s$';
}
