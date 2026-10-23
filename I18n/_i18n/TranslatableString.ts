/**
 * Класс локализуемой строки.
 * @public
 * @author Кудрявцев И.С.
 */
class TranslatableString extends String {
    /**
     * Поле, которое сигнализирует, что это переводимая строка.
     */
    i18n: boolean = true;

    /**
     * Конструктор класса
     * @param value Ключ перевода.
     * @param translate Функция перевода.
     */
    constructor(private value: string, private translate: Function) {
        super();
    }

    toString(): string {
        return this.translatedValue;
    }

    toJSON(): string {
        return this.translatedValue;
    }

    valueOf(): string {
        return this.translatedValue;
    }

    get length(): number {
        return this.translatedValue.length;
    }

    protected get translatedValue(): string {
        const translateResult = this.translate();

        return String(translateResult !== undefined ? translateResult : this.value);
    }

    /*
    Слой совместимости.
    Функция возвращает объект String добавляя реализацию методов toJSON и valueOf.
   */
    static getNativeString(value: string): String {
        // eslint-disable-next-line no-new-wrappers
        const res = new String(value);

        (res as TranslatableString).toJSON = res.valueOf = () => {
            return value;
        };

        (res as TranslatableString).i18n = true;

        return res;
    }
}

export default TranslatableString;
