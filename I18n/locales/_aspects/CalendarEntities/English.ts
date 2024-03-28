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
    'December',
];

const shortMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

/**
 * Описание констант календарных значений для английского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default class English implements ICalendarEntities {
    minDays: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    shortDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    longDays: string[] = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    shortMonths: string[] = shortMonths;
    shortGenitiveMonths: string[] = shortMonths;
    shortLocativeMonths: string[] = shortMonths;
    longMonths: string[] = months;
    longGenitiveMonths: string[] = months;
    longLocativeMonths: string[] = months;
    am: string = 'am';
    pm: string = 'pm';
    minHalfYear: string = '$digit$s$ hy';
    longHalfYear: string = '$digit$s$ half year';
    minQuarter: string = '$digit$s$ qtr';
    shortQuarter: string = '$digit$s$ qtr';
    longQuarter: string = '$digit$s$ quarter';
    quarters: string[] = ['I', 'II', 'III', 'IV'];
    longQuarters: string[] = ['I quarter', 'II quarter', 'III quarter', 'IV quarter'];
    today: string = 'Today';
    allPeriod: string = 'Whole period';
    openFinishPeriod: string = 'from $digit$s$';
    openStartPeriod: string = 'to $digit$s$';
}
