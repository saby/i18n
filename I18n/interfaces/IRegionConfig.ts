import IDate from './IDate';
import INumber from './INumber';
import { regionCode } from './IAvailableCodes';
import IEcosystem from './IEcosystem';
import type {
    currencyName,
    shortCurrencyName,
    superShortCurrencyName,
    shortSubunitName,
    subunitName,
    superShortSubunitName,
} from './IMoneyEntities';

/**
 * Описания конфигурации денег, как она хранится в региональной конфигарции.
 * @public
 */
export interface IMoneyFromRegionConfig {
    /**
     *
     */
    symbol: string;
    /**
     *
     */
    currency: currencyName;
    /**
     *
     */
    shortCurrency: shortCurrencyName;
    /**
     *
     */
    superShortCurrency: superShortCurrencyName;
    /**
     *
     */
    currencyDenominations: number[];
    /**
     *
     */
    subunit: subunitName;
    /**
     *
     */
    shortSubunit: shortSubunitName;
    /**
     *
     */
    superShortSubunit: superShortSubunitName;
    /**
     *
     */
    subunitDenominations: number[];
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
    Money: IMoneyFromRegionConfig;
}
