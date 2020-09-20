import INumber from '../../Interfaces/INumber';

/**
 * Описание числовых конастан для европеской системы.
 * @class I18n/locales/_aspects/Number/Europe
 * @implements I18n/locales/Interfaces/INumber
 * @author Кудрявцев И.С.
 */
export default class Europe implements INumber  {
    fractionSeparator: string = ',';
    triadDelimiter: string = ' ';
}
