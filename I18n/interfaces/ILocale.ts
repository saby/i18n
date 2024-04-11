import { directionalityCode, localeCode } from './IAvailableCodes';
import IDate from './IDate';
import INumber from './INumber';
import IMoney from './IMoney';
import ICalendarEntities from './ICalendarEntities';
import IMoneyEntities from './IMoneyEntities';
import ITimeUnits from './ITimeUnits';
import IEcosystem from './IEcosystem';

/**
 * Интерфейс конфигурации локали.
 * @public
 * @author Кудрявцев И.С.
 */
export default interface ILocale {
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
}
