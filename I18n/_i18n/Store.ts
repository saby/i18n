import IStore from '../interfaces/IStore';

/**
 * Класс хранилища загружаемых ресурсов.
 * @private
 * @author Кудрявцев И.С.
 */
class Store<T> implements IStore<T> {
    private elements: { [key: string]: T } = {};
    private loadableElements: { [key: string]: Promise<T> } = {};

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
            delete this.loadableElements[key];
            return Promise.resolve(this.elements[key]);
        }

        return new Promise((resolve, reject) => {
            if (this.loadableElements.hasOwnProperty(key)) {
                this.loadableElements[key]
                    .then(() => {
                        resolve(this.elements[key]);
                    })
                    .catch(reject);
            } else {
                reject(`Element with name "${key}" don't have in store.`);
            }
        });
    }

    set(key: string, element?: T): void {
        if (element) {
            this.elements[key] = element as T;
            return;
        }

        this.loadableElements[key] = this.loader(key);

        this.loadableElements[key].then((configuration) => {
            this.elements[key] = configuration;
        });
    }
}

export default Store;
