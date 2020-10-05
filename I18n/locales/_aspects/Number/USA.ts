import INumber from '../../../interfaces/INumber';

/**
 * Описание числовых констан для американской системы.
 * @public
 * @author Кудрявцев И.С.
 */
export default class USA implements INumber {
    fractionSeparator: string = '.';
    triadDelimiter: string = ',';
}
