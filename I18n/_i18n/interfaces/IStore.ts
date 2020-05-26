export default interface IStore<T> {
    get(key: string, sync?: boolean): Promise<T> | T | undefined;

    set(value: T | string): void;
}
