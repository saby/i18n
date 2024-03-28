import ICalendarEntities from '../../../interfaces/ICalendarEntities';

/**
 * Описание констант календарных значений для туркменского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default class Turkmen implements ICalendarEntities {
    minDays: string[] = ['Su', 'Du', 'Si', 'Ça', 'Pe', 'Ju', 'Şe'];
    shortDays: string[] = ['Sun', 'Duş', 'Siş', 'Çar', 'Pen', 'Jum', 'Şen'];
    longDays: string[] = [
        'Sundayekşenbe',
        'Duşenbe',
        'Sişenbe',
        'Çarşenbe',
        'Penşenbe',
        'Juma',
        'Şenbe',
    ];
    shortMonths: string[] = [
        'Jan',
        'Few',
        'Mar',
        'Apr',
        'Maý',
        'Iýun',
        'Iýul',
        'Awg',
        'Sen',
        'Okt',
        'Noý',
        'Dek',
    ];
    shortGenitiveMonths: string[] = [
        'Jan',
        'Few',
        'Mar',
        'Apr',
        'Maý',
        'Iýun',
        'Iýul',
        'Awg',
        'Sen',
        'Okt',
        'Noý',
        'Dek',
    ];
    shortLocativeMonths: string[] = [
        'Jan',
        'Few',
        'Mar',
        'Apr',
        'Mae',
        'Iýun',
        'Iýul',
        'Awg',
        'Sen',
        'Okt',
        'Noý',
        'Dek',
    ];
    longMonths: string[] = [
        'Januaryanwar',
        'Fewral',
        'Mart',
        'Aprel',
        'Maý',
        'Iýun',
        'Iýul',
        'Awgust',
        'Sentýabr',
        'Oktýabr',
        'Noýabr',
        'Dekabr',
    ];
    longGenitiveMonths: string[] = [
        'Januaryanwar',
        'Fewral',
        'Marta',
        'Aprel',
        'Maý',
        'Iýun',
        'Iýul',
        'Awgusta',
        'Sentýabr',
        'Oktýabr',
        'Noýabr',
        'Dekabr',
    ];
    longLocativeMonths: string[] = [
        'Januaryanwar',
        'Fewral',
        'Marte',
        'Aprel',
        'Mae',
        'Iýun',
        'Iýul',
        'Awgust',
        'Sentýabr',
        'Oktýabr',
        'Noýabr',
        'Dekabr',
    ];
    am: string = 'gö';
    pm: string = 'gs';
    minHalfYear: string = '$digit$s$ ýa';
    longHalfYear: string = '$digit$s$ ýarym ýyl';
    minQuarter: string = '$digit$s$ çä';
    shortQuarter: string = '$digit$s$ çär';
    longQuarter: string = '$digit$s$ çärýek';
    manyQuarter: string = '$digit$s$ çärýek';
    quarters: string[] = ['I', 'II', 'III', 'IV'];
    longQuarters: string[] = ['I çärýek', 'II çärýek', 'III çärýek', 'IV çärýek'];
    today: string = 'Bu gün';
    allPeriod: string = 'Allhli döwür';
    openFinishPeriod: string = 'den $digit$s$';
    openStartPeriod: string = 'çenli $digit$s$';
}
