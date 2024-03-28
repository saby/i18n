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
    minHalfYear: string = 'S$digit$s$';
    longHalfYear: string = 'Semestre $digit$s$';
    minQuarter: string = 'T$digit$s$';
    shortQuarter: string = 'T$digit$s$';
    longQuarter: string = 'Trimestre $digit$s$';
    manyQuarter: string = 'Trimestres $digit$s$';
    quarters: string[] = ['I', 'II', 'III', 'IV'];
    longQuarters: string[] = ['I trimestre', 'II trimestre', 'III trimestre', 'IV trimestre'];
    today: string = "Aujourd'hui";
    allPeriod: string = 'Toute la période';
    openFinishPeriod: string = 'du $digit$s$';
    openStartPeriod: string = 'àu $digit$s$';
}
