import ILocale from '../interfaces/ILocale';
import ILangConfig from '../interfaces/ILangConfig';
import IRegionConfig from '../interfaces/IRegionConfig';
import { directionalityCode, localeCode } from '../interfaces/IAvailableCodes';
import IDate from '../interfaces/IDate';
import INumber from '../interfaces/INumber';
import IMoney from '../interfaces/IMoney';
import IMoneyEntities from '../interfaces/IMoneyEntities';
import ICalendarEntities from '../interfaces/ICalendarEntities';
import ITimeUnits from '../interfaces/ITimeUnits';
import IEcosystem from '../interfaces/IEcosystem';

class Locale implements ILocale {
    /**
     * Код локали. Образуется склейкой кода языка и региона.
     */
    code: localeCode;

    /**
     * Свойства экосистемы в котором работает приложения.
     */
    ecosystem: IEcosystem;

    /**
     * Направление контента.
     */
    directionality: directionalityCode;

    /**
     * Описание констант календарных значений.
     */
    calendarEntities: ICalendarEntities;

    /**
     * Описание констант календарных значений.
     */
    moneyEntities: IMoneyEntities;

    /**
     * Функция форматирования временного интервала в строку.
     */
    timeInterval: (interval: ITimeUnits, short: boolean) => string;

    /**
     * Плюральная функция.
     */
    plural: (pluralNumber: number, ...words: string[]) => string;

    /**
     * Описание форматов отображения дат.
     */
    date: IDate;

    /**
     * Описание числовых констант.
     */
    number: INumber;

    /**
     * Описание констант денежных значений.
     */
    money: IMoney;

    constructor(code: localeCode, langConfig: ILangConfig, regionConfig: IRegionConfig) {
        this.code = code;
        this.directionality = langConfig.directionality;
        this.date = regionConfig.DateTimeFormats;
        this.ecosystem = regionConfig.Ecosystem;
        this.number = regionConfig.NumberFormat;
        this.money = {
            symbol: regionConfig.Money.symbol,
            currency: langConfig.moneyEntities.currency[regionConfig.Money.currency],
            shortCurrency: langConfig.moneyEntities.shortCurrency[regionConfig.Money.shortCurrency],
            superShortCurrency:
                langConfig.moneyEntities.superShortCurrency[regionConfig.Money.superShortCurrency],
            subunit: langConfig.moneyEntities.subunit[regionConfig.Money.subunit],
            shortSubunit: langConfig.moneyEntities.shortSubunit[regionConfig.Money.shortSubunit],
            superShortSubunit:
                langConfig.moneyEntities.superShortSubunit[regionConfig.Money.superShortSubunit],
        };
        this.moneyEntities = langConfig.moneyEntities;
        this.calendarEntities = langConfig.calendarEntities;
        this.timeInterval = langConfig.timeInterval;
        this.plural = langConfig.plural;
    }
}

export default Locale;
