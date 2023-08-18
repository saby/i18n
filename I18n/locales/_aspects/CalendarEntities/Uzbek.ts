import ICalendarEntities from '../../../interfaces/ICalendarEntities';

const longMonths = [
    'Yanvar',
    'Fevral',
    'Mart',
    'Aprel',
    'May',
    'Iyun',
    'Iyul',
    'Avgust',
    'Sentyabr',
    'Oktyabr',
    'Noyabr',
    'Dekabr',
];

const shortMonths = [
    'Yan',
    'Fev',
    'Mar',
    'Apr',
    'May',
    'Iyun',
    'Iyul',
    'Avg',
    'Sen',
    'Okt',
    'Noy',
    'Dek',
];

/**
 * Описание констант календарных значений для узбекского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default class Uzbek implements ICalendarEntities {
    minDays: string[] = ['Ya', 'Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh'];
    shortDays: string[] = ['Yaks', 'Dush', 'Sesh', 'Chor', 'Pays', 'Juma', 'Shanba'];
    longDays: string[] = [
        'Yakshanba',
        'Dushanba',
        'Seshanba',
        'Chorshanba',
        'Payshanba',
        'Juma',
        'Shanba',
    ];
    shortMonths: string[] = shortMonths;
    shortGenitiveMonths: string[] = shortMonths;
    shortLocativeMonths: string[] = shortMonths;
    longMonths: string[] = longMonths;
    longGenitiveMonths: string[] = longMonths;
    longLocativeMonths: string[] = longMonths;
    am: string = 'to';
    pm: string = 'ps';
    minHalfYear: string = '$digit$s$ yy';
    longHalfYear: string = '$digit$s$ yarim yil';
    minQuarter: string = '$digit$s$ chr';
    shortQuarter: string = '$digit$s$ chr';
    longQuarter: string = '$digit$s$ chorak';
    quarters: string[] = ['I', 'II', 'III', 'IV'];
    longQuarters: string[] = ['I chorak', 'II chorak', 'III chorak', 'IV chorak'];
    today: string = 'Bugun';
    allPeriod: string = 'Butun davr';
    openFinishPeriod: string = 'gacha $digit$s$';
    openStartPeriod: string = 'dan $digit$s$';
}
