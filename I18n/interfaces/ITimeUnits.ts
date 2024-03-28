type TimeUnits = 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds';

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

export interface ILiteralTimeUnits {
    years: string[];
    months: string[];
    days: string[];
    hours: string[];
    minutes: string[];
    seconds: string[];
}

export interface ITimeIntervalConfig {
    short: { [name in TimeUnits]: string[] };
    full: { [name in TimeUnits]: string[] };
}

type ObjectEntry = [keyof ITimeUnits, NonNullable<ITimeUnits[keyof ITimeUnits]>];
export type TimeUnitsEntries = ObjectEntry[];
