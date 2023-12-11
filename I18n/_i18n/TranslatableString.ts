import ITranslatableString from '../interfaces/ITranslatableString';

/**
 * Класс локализуемой строки.
 * @private
 * @author Кудрявцев И.С.
 */
class TranslatableString extends String implements ITranslatableString {
    i18n: boolean = true;
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

        (res as ITranslatableString).toJSON = res.valueOf = () => {
            return value;
        };

        (res as ITranslatableString).i18n = true;

        return res;
    }
}

export default TranslatableString;
