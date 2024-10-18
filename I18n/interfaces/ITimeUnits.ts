/**
 * Интерфейс конфигурации для временного интервала.
 * @public
 * @author Кудрявцев И.С.
 */
export default interface ITimeUnits {
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}

type ObjectEntry = [keyof ITimeUnits, NonNullable<ITimeUnits[keyof ITimeUnits]>];

export type TimeUnitsEntries = ObjectEntry[];
