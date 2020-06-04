import ITranslatableString from './ITranslatableString';
import IContext from './IContext';

export default interface ITranslator {
    translate(key: string, context?: string | number, pluralNumber?: number): string | ITranslatableString | String ;
    translateKey(key: string, context?: string | number, pluralNumber?: number): string;
    setDictionaries(context: IContext): void;
}
