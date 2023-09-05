import ICalendarEntities from '../../../interfaces/ICalendarEntities';

const longMonths = [
    'Қаңтар',
    'Ақпан',
    'Наурыз',
    'Сәуір',
    'Мамыр',
    'Маусым',
    'Шілде',
    'Тамыз',
    'Қыркүйек',
    'Қазан',
    'Қараша',
    'Желтоқсан',
];

const shortMonths = [
    'Қаңт',
    'Ақп',
    'Наур',
    'Сәу',
    'Мам',
    'Мау',
    'Шіл',
    'Там',
    'Қырк',
    'Қаз',
    'Қар',
    'Желт',
];

/**
 * Описание констант календарных значений для казахского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default class Kazakh implements ICalendarEntities {
    minDays: string[] = ['Жс', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сн'];
    shortDays: string[] = ['Жекс', 'Дүйс', 'Сейс', 'Сәрс', 'Бейс', 'Жұма', 'Сенбі'];
    longDays: string[] = [
        'Жексенбі',
        'Дүйсенбі',
        'Сейсенбі',
        'Сәрсенбі',
        'Бейсенбі',
        'Жұма',
        'Сенбі',
    ];
    shortMonths: string[] = shortMonths;
    shortGenitiveMonths: string[] = shortMonths;
    shortLocativeMonths: string[] = shortMonths;
    longMonths: string[] = longMonths;
    longGenitiveMonths: string[] = longMonths;
    longLocativeMonths: string[] = [
        'Қаңтарда',
        'Ақпанда',
        'Наурызда',
        'Сәуірде',
        'Мамырда',
        'Маусымда',
        'Шілдеде',
        'Тамызда',
        'Қыркүйекте',
        'Қазанда',
        'Қарашада',
        'Желтоқсанда',
    ];
    am: string = 'тд';
    pm: string = 'тк';
    minHalfYear: string = '$digit$s$ жж';
    longHalfYear: string = '$digit$s$ жарты жылдық';
    minQuarter: string = '$digit$s$ тоқ';
    shortQuarter: string = '$digit$s$ тоқ';
    longQuarter: string = '$digit$s$ тоқсан';
    quarters: string[] = ['I', 'II', 'III', 'IV'];
    longQuarters: string[] = ['I тоқсан', 'II тоқсан', 'III тоқсан', 'IV тоқсан'];
    today: string = 'бүгін';
    allPeriod: string = 'кезең бойы';
    openFinishPeriod: string = '$digit$s$ бастап';
    openStartPeriod: string = '$digit$s$ дейін';
}
