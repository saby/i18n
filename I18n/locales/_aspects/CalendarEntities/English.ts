import ICalendarEntities from '../../../interfaces/ICalendarEntities';

const months = [
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
];

/**
 * Описание констан каледнарных значений для англиского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default class English implements ICalendarEntities {
    minDays: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    shortDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    longDays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    shortMonths: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    longMonths: string[] = months;
    ordinalMonths: string[] = months;
    shortOrdinalMonths: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    am: string  = 'am';
    pm: string  = 'pm';
    minHalfYear: string  = '$digit$s$ hy';
    longHalfYear: string  = '$digit$s$ half year';
    minQuarter: string  = '$digit$s$ qt';
    shortQuarter: string  = '$digit$s$ qtr';
    longQuarter: string  = '$digit$s$ quarter';
    quarters: string[] = ['I', 'II', 'III', 'IV'];
    longQuarters: string[] = ['I quarter', 'II quarter', 'III quarter', 'IV quarter'];
    today: string = 'Today';
    allPeriod: string = 'Whole period';
    openFinishPeriod: string  = 'from $digit$s$';
    openStartPeriod: string  = 'to $digit$s$';
}
