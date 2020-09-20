import INumber from '../../Interfaces/INumber';

/**
 * Описание числовых конастан для американской системы.
 * @class I18n/locales/_aspects/Number/USA
 * @implements I18n/locales/Interfaces/INumber
 * @author Кудрявцев И.С.
 */
export default class USA implements INumber {
    fractionSeparator: string = '.';
    triadDelimiter: string = ',';
}
