import ITranslatableString from './interfaces/ITranslatableString';

class TranslatableString extends String implements ITranslatableString {
    constructor(private value: string, private translate: Function) {
        super();
    }

    /*
    Слой совместимости.
    Функция возвращает объект String добавляя реализацию методов toJSON и valueOf.
   */
    static getNativeString(value: string): String {
        // tslint:disable-next-line:no-construct
        const res = new String(value);

        (res as any).toJSON = (res as any).valueOf = () => value;

        return res;
    }

    get length(): number {
        return this.translatedValue.length;
    }

    protected get translatedValue(): string {
        const translateResult = this.translate();

        return String(translateResult !== undefined ? translateResult : this.value);
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
}

export default TranslatableString;
