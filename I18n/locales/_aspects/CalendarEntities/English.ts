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
    minHalfYear: string = 'H$digit$s$';
    longHalfYear: string = 'Half $digit$s$';
    longHalfYears: string[] = ['Half 1', 'Half 2'];
    shortHalfYears: string[] = ['H1', 'H2'];
    minQuarter: string = 'Q$digit$s$';
    shortQuarter: string = 'Q$digit$s$';
    longQuarter: string = 'Quarter $digit$s$';
    manyQuarter: string = 'Quarters $digit$s$';
    quarters: string[] = ['1', '2', '3', '4'];
    longQuarters: string[] = ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'];
    shortQuarters: string[] = ['Q1', 'Q2', 'Q3', 'Q4'];
    minQuarters: string[] = ['Q1', 'Q2', 'Q3', 'Q4'];
    today: string = 'Today';
    allPeriod: string = 'Whole period';
    openFinishPeriod: string = 'from $digit$s$';
    openStartPeriod: string = 'to $digit$s$';
}
