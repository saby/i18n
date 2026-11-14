import ICalendarEntities from '../../../interfaces/ICalendarEntities';

const months = [
    'Ιανουάριου',
    'Φεβρουάριου',
    'Μάρτιου',
    'Απρίλιου',
    'Μάιου',
    'Ιούνιου',
    'Ιούλιου',
    'Αύγουστου',
    'Σεπτέμβριου',
    'Οκτώβριου',
    'Νοέμβριου',
    'Δεκέμβριου',
];
const shortMonths = [
    'Ιαν',
    'Φεβ',
    'Μάρ',
    'Απρ',
    'Μάι',
    'Ιούν',
    'Ιούλ',
    'Αύγ',
    'Σεπ',
    'Οκτ',
    'Νοέ',
    'Δεκ',
];

/**
 * Описание констант календарных значений для греческого языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default class Greek implements ICalendarEntities {
    minDays: string[] = ['Κυ', 'Δε', 'Τρ', 'Τε', 'Πέ', 'Πα', 'Σά'];
    shortDays: string[] = ['Κυρ', 'Δευ', 'Τρί', 'Τετ', 'Πέμ', 'Παρ', 'Σάβ'];
    longDays: string[] = [
        'Κυριακή',
        'Δευτέρα',
        'Τρίτη',
        'Τετάρτη',
        'Πέμπτη',
        'Παρασκευή',
        'Σάββατο',
    ];
    shortMonths: string[] = shortMonths;
    shortGenitiveMonths: string[] = shortMonths;
    shortLocativeMonths: string[] = shortMonths;
    longMonths: string[] = months;
    longGenitiveMonths: string[] = months;
    longLocativeMonths: string[] = months;
    am: string = 'πμ';
    pm: string = 'μμ';
    minHalfYear: string = '$digit$s$ εξ';
    longHalfYear: string = '$digit$s$ εξάμηνο';
    longHalfYears: string[] = ['I εξάμηνο', 'II εξάμηνο'];
    shortHalfYears: string[] = ['I εξ', 'II εξ'];
    minQuarter: string = '$digit$s$ τέτ';
    shortQuarter: string = '$digit$s$ τέτ';
    longQuarter: string = '$digit$s$ τέταρτο';
    manyQuarter: string = '$digit$s$ τέταρτο';
    quarters: string[] = ['I', 'II', 'III', 'IV'];
    longQuarters: string[] = ['I τέταρτο', 'II τέταρτο', 'III τέταρτο', 'IV τέταρτο'];
    shortQuarters: string[] = ['I τέτ', 'II τέτ', 'III τέτ', 'IV τέτ'];
    minQuarters: string[] = ['I τέτ', 'II τέτ', 'III τέτ', 'IV τέτ'];
    today: string = 'Σήμερα';
    allPeriod: string = 'Όλη η περίοδος';
    openFinishPeriod: string = 'από $digit$s$';
    openStartPeriod: string = 'έως $digit$s$';
}
