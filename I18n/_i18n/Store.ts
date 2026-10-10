/**
 * Класс хранилища загружаемых ресурсов.
 * @private
 * @author Кудрявцев И.С.
 */
class Store<Key extends string, Element> {
    /**
     * Набор элементов в хранилище.
     */
    elements: { [K in Key]?: Element } = {};

    /**
     * Конструктор сайта
     * @param elements Массив елментов, которые надо начать грузить сразу.
     * @param loader Функция загрузки элемента
     * @param postLoad Функция которую надо выполнить после загрузки.
     */
    constructor(
        elements: Key[],
        private loader: (key: Key) => Promise<Element>,
        private postLoad: () => void
    ) {
        for (const element of elements) {
            this.set(element);
        }
    }

    /**
     * Возвращает значение элемента, если ещё не загружен то ждёт пока загрузится.
     * @param key Имя элемента.
     */
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

    /**
     * Записывает элемент в хранилище, если не передано значение, выполяется его загрузка.
     * @param key Имя элемента
     * @param element Значение элемента
     */
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
