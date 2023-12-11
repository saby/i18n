import IDate from './IDate';
import INumber from './INumber';
import { regionCode } from './IAvailableCodes';
import IEcosystem from './IEcosystem';

interface IMoney {
    symbol: string;
    currency: string;
    shortCurrency: string;
    superShortCurrency: string;
    subunit: string;
    shortSubunit: string;
    superShortSubunit: string;
}

/**
 * Интерфейс региональной конфигурации.
 * @public
 * @author Кудрявцев И.С.
 */
export default interface IRegionConfig {
    /**
     * Код региона.
     */
    code: regionCode;

    /**
     * Свойства экосистемы в котором работает приложения.
     */
    Ecosystem: IEcosystem;

    /**
     * Описание форматов отображения дат.
     */
    DateTimeFormats: IDate;

    /**
     * Описание числовых констант.
     */
    NumberFormat: INumber;

    /**
     * Описание констант денежных значений.
     */
    Money: IMoney;
}
