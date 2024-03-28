import ICalendarEntities from '../../../interfaces/ICalendarEntities';

const months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
];

const shortMonths = [
    'Jan',
    'Fév',
    'Mar',
    'Avr',
    'Mai',
    'Juin',
    'Juil',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Déc',
];

/**
 * Описание констант календарных значений для французского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default class French implements ICalendarEntities {
    minDays: string[] = ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'];
    shortDays: string[] = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    longDays: string[] = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    shortMonths: string[] = shortMonths;
    shortGenitiveMonths: string[] = shortMonths;
    shortLocativeMonths: string[] = shortMonths;
    longMonths: string[] = months;
    longGenitiveMonths: string[] = months;
    longLocativeMonths: string[] = months;
    am: string = 'am';
    pm: string = 'pm';
    minHalfYear: string = '$digit$s$ ls';
    longHalfYear: string = '$digit$s$ le semestre';
    minQuarter: string = '$digit$s$ qt';
    shortQuarter: string = '$digit$s$ qtr';
    longQuarter: string = '$digit$s$ quart';
    quarters: string[] = ['I', 'II', 'III', 'IV'];
    longQuarters: string[] = ['I quart', 'II quart', 'III quart', 'IV quart'];
    today: string = "Aujourd'hui";
    allPeriod: string = 'Toute la période';
    openFinishPeriod: string = 'de $digit$s$';
    openStartPeriod: string = 'par $digit$s$';
}
