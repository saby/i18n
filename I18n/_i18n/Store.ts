import IStore from '../interfaces/IStore';

/**
 * Класс хранилища загружаемых ресурсов.
 * @private
 * @author Кудрявцев И.С.
 */
class Store<T> implements IStore<T> {
    private elements: { [key: string]: T } = {};

    constructor(elements: string[], private loader: (key: string) => Promise<T>) {
        for (const element of elements) {
            this.set(element);
        }
    }

    get(key: string, sync: boolean = false): Promise<T> | T | undefined {
        if (sync) {
            return this.elements[key];
        }

        if (this.elements.hasOwnProperty(key)) {
            return Promise.resolve(this.elements[key]);
        }

        return this.loader(key).then((configuration) => {
            this.elements[key] = configuration;

            return configuration;
        });
    }

    set(key: string, element?: T): void {
        if (element) {
            this.elements[key] = element as T;

            return;
        }

        this.loader(key).then((configuration) => {
            this.elements[key] = configuration;
        });
    }
}

export default Store;
