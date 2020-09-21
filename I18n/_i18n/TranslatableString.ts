import ITranslatableString from './interfaces/ITranslatableString';

/**
 * Класс локализуемой строки.
 * @class I18n/_i18n/TranslatableString
 * @extends String
 * @implements I18n/_i18n/interfaces/ITranslatableString
 * @private
 * @author Кудрявцев И.С.
 */
class TranslatableString extends String implements ITranslatableString {
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
        // tslint:disable-next-line:no-construct
        const res = new String(value);

        (res as ITranslatableString).toJSON = res.valueOf = () => value;

        return res;
    }
}

export default TranslatableString;
