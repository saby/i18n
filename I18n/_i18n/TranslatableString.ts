import ITranslatableString from './interfaces/ITranslatableString';

class TranslatableString extends String implements ITranslatableString {
    constructor(private value: string, private translate: Function) {
        super();
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
