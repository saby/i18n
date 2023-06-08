import INumber from '../../../interfaces/INumber';

/**
 * Описание числовых констант для отображения числа в приложениях СБИС.
 * @public
 * @author Кудрявцев И.С.
 */
export default class SABY implements INumber {
    fractionSeparator: string = '.';
    triadDelimiter: string = ' ';
}
