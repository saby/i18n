/**
 * Класс хранилища загружаемых ресурсов.
 * @private
 * @author Кудрявцев И.С.
 */
class Store<Key extends string, Element> {
    elements: { [K in Key]?: Element } = {};

    constructor(
        elements: Key[],
        private loader: (key: Key) => Promise<Element>,
        private postLoad: () => void
    ) {
        for (const element of elements) {
            this.set(element);
        }
    }

    get(key: Key): Promise<Element | undefined> {
        if (this.elements.hasOwnProperty(key)) {
            return Promise.resolve(this.elements[key]);
        }

        return this.loader(key).then((configuration) => {
            this.elements[key] = configuration;

            this.postLoad();

            return configuration;
        });
    }

    set(key: Key, element?: Element): void {
        if (element) {
            this.elements[key] = element as Element;

            this.postLoad();

            return;
        }

        this.loader(key).then((configuration) => {
            this.elements[key] = configuration;

            this.postLoad();
        });
    }
}

export default Store;
