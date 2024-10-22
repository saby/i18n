import ICalendarEntities from './ICalendarEntities';
import ITimeUnits from './ITimeUnits';
import IMoneyEntities from './IMoneyEntities';
import IDate from './IDate';
import { langCode, directionalityCode } from './IAvailableCodes';

/**
 * Интерфейс языковой конфигурации.
 * @public
 * @author Кудрявцев И.С.
 */
export default interface ILangConfig {
    /**
     * Код языка.
     */
    code: langCode;

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
     * Форматы дат. Если не указаны, берутся форматы для региона.
     */
    dateTimeFormat?: IDate;
}
