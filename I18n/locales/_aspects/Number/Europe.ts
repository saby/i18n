import INumber from '../../Interfaces/INumber';

/**
 * Описание числовых констан для европеской системы.
 * @public
 * @author Кудрявцев И.С.
 */
export default class Europe implements INumber  {
    fractionSeparator: string = ',';
    triadDelimiter: string = ' ';
}
