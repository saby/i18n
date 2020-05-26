import ITranslatableString from './ITranslatableString';

export default interface ITranslator {
    translate(key: string, context?: string | number, pluralNumber?: number): string | ITranslatableString ;
    translateKey(key: string, context?: string | number, pluralNumber?: number): string;
}
