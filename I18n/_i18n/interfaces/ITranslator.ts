import ITranslatableString from './ITranslatableString';
import IContext from './IContext';

/**
 * Интерфейс класса переводчика.
 * @interface I18n/_i18n/interfaces/ITranslator
 * @public
 * @author Кудрявцев И.С.
 */
export default interface ITranslator {
    translate(key: string, context?: string | number, pluralNumber?: number): string | ITranslatableString | String ;
    translateKey(key: string, context?: string | number, pluralNumber?: number): string;
    setDictionaries(context: IContext): void;
}
