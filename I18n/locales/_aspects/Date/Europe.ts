import IDate from '../../../interfaces/IDate';
import Base from './Base';

/**
 * Описание форматов отоброжения дат в европейской системе.
 * @public
 * @author Кудрявцев И.С.
 */
export default class Europe extends Base implements IDate {
    fullDateFormat: string = 'DD.MM.YY';
    fullDateFullYearFormat: string = 'DD.MM.YYYY';
    shortDateFormat: string = 'DD.MM';
    fullDateDayOfWeekFormat: string = 'dddd, D MMMM\'YY';
    shortDateDayOfWeekFormat: string = 'dddd, D MMMM';
    fullDateFullMonthFormat: string = 'D MMMM\'YY';
    fullDateFullMonthFullYearFormat: string = 'D MMMM, YYYY';
    fullDateShortMonthFormat: string = 'D MMM\'YY';
    fullDateShortMonthFullYearFormat: string = 'D MMM YYYY';
    fullMonthFormat: string = 'MMMM\'YY';
}
