import ITranslatableString from './ITranslatableString';
import IContext from './IContext';

/**
 * Интерфейс класса переводчика.
 * @public
 * @author Кудрявцев И.С.
 */
export default interface ITranslator {
    /**
     * Функция перевода строкового значения в локализванный вариант.
     * @param key Значение которое надо локолизовать.
     * @param context Контекст перевода или число для плюральной формы.
     * @param pluralNumber Число для плюральной формы.
     */
    translate(
        key: string,
        context?: string | number,
        pluralNumber?: number
    ): string | ITranslatableString | String;

    translateKey(key: string, context?: string | number, pluralNumber?: number): string;

    /**
     * Перезаписывает словари переводчика.
     * @param dictionaries Объект со словарями.
     */
    setDictionaries(dictionaries: IContext): void;
}
