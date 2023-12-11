/**
 * Интерфейс класса хранилища ресурсов локализации.
 * @public
 * @author Кудрявцев И.С.
 */
export default interface IStore<T> {
    elements: { [key: string]: T };

    get(key: string, sync?: boolean): Promise<T> | T | undefined;

    set(key: string, element?: T): void;
}
