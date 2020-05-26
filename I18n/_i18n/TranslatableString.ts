import ITranslator from './interfaces/ITranslator';
import ITranslatableString from './interfaces/ITranslatableString';

interface ITranslatableValue {
    key: string;
    contextValue: string;
    pluralValue: number;
}

class TranslatableString extends String implements ITranslatableString {
    constructor(private value: ITranslatableValue, private translator: ITranslator) {
        super();
    }

    get length(): number {
        return this.translatedValue.length;
    }

    get translatedValue(): string {
        const translateResult = this.translator.translateKey(
            this.value.key,
            this.value.contextValue,
            this.value.pluralValue)
        ;

        return String(translateResult !== undefined ? translateResult : this.value.key);
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
