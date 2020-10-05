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
    fullDateDayOfWeekFormat: string = 'dddd, DD MMMM\'YY';
    shortDateDayOfWeekFormat: string = 'dddd, DD MMMM';
    fullDateFullMonthFormat: string = 'DD MMMM\'YY';
    fullDateFullMonthFullYearFormat: string = 'DD MMMM, YYYY';
    fullDateShortMonthFormat: string = 'DD MMM\'YY';
    fullDateShortMonthFullYearFormat: string = 'DD MMM YYYY';
    fullMonthFormat: string = 'MMMM\'YY';
}
