import ICalendarEntities from '../../../interfaces/ICalendarEntities';

const shortMonths = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'Pue',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
];
const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Puede',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
];

/**
 * Описание констант календарных значений для испанского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default class Spanish implements ICalendarEntities {
    minDays: string[] = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
    shortDays: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    longDays: string[] = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    shortMonths: string[] = shortMonths;
    shortGenitiveMonths: string[] = shortMonths;
    shortLocativeMonths: string[] = shortMonths;
    longMonths: string[] = months;
    longGenitiveMonths: string[] = months;
    longLocativeMonths: string[] = months;
    am: string = 'am';
    pm: string = 'pm';
    minHalfYear: string = '$digit$s$S';
    longHalfYear: string = '$digit$s$ semestre';
    longHalfYears: string[] = ['1 semestre', '1 semestre'];
    shortHalfYears: string[] = ['1S', '2S'];
    minQuarter: string = '$digit$s$T';
    shortQuarter: string = '$digit$s$T';
    longQuarter: string = '$digit$s$ trimestre';
    manyQuarter: string = '$digit$s$ trimestres';
    quarters: string[] = ['1', '2', '3', '4'];
    longQuarters: string[] = ['1 trimestre', '2 trimestre', '3 trimestre', '4 trimestre'];
    shortQuarters: string[] = ['1T', '2T', '3T', '4T'];
    minQuarters: string[] = ['1T', '2T', '3T', '4T'];
    today: string = 'Hoy';
    allPeriod: string = 'Todo el periodo';
    openFinishPeriod: string = 'del $digit$s$';
    openStartPeriod: string = 'al $digit$s$';
}
