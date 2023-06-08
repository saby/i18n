import { constants } from 'Env/Env';

import TranslatableString from './TranslatableString';

import ITranslator from '../interfaces/ITranslator';
import IController from '../interfaces/IController';
import ILocale from '../interfaces/ILocale';
import IContext from '../interfaces/IContext';
import ITranslatableString from '../interfaces/ITranslatableString';

/**
 * Класс переводчика. Содержит API для локализации строковых значений.
 * @public
 * @author Кудрявцев И.С.
 */
class Translator implements ITranslator {
    constructor(private dictionaries: IContext, private controller: IController) {}

    translate(
        key: string,
        context?: string | number,
        pluralNumber?: number
    ): string | ITranslatableString | String {
        if (typeof key === 'string') {
            let contextValue = context;
            let pluralValue = pluralNumber;

            if (typeof context === 'number') {
                pluralValue = contextValue as number;
                contextValue = undefined;
            }

            if (!this.controller.isEnabled) {
                return constants.isServerSide ? TranslatableString.getNativeString(key) : key;
            }

            if (constants.isServerSide) {
                return new TranslatableString(key, () => {
                    return this.translateKey(key, contextValue as string, pluralValue);
                });
            } else {
                return this.translateKey(key, contextValue as string, pluralValue);
            }
        }

        return key;
    }

    setDictionaries(dictionaries: IContext): void {
        this.dictionaries = dictionaries;
    }

    translateKey(key: string, context?: string, pluralNumber?: number): string {
        const currentLocale = this.controller.currentLocaleConfig;
        let translatedKey;

        if (this.dictionaries.hasOwnProperty(currentLocale.code)) {
            if (pluralNumber !== undefined) {
                const pluralForms = this.getTranslatedKey(
                    this.controller.pluralPrefix + key,
                    context,
                    currentLocale
                );

                if (pluralForms) {
                    translatedKey = this._translatePlural(pluralForms, pluralNumber, currentLocale);
                }
            } else {
                translatedKey = this.getTranslatedKey(key, context, currentLocale);
            }
        }

        return translatedKey === undefined ? key : translatedKey;
    }

    protected getTranslatedKey(key: string, context: string, locale: ILocale): string {
        const contextKey = context
            ? `${context}${this.controller.contextSeparator}${key}`
            : `${key}`;

        return this.dictionaries[locale.code][contextKey];
    }

    protected _translatePlural(pluralForms: string, pluralNumber: number, locale: ILocale): string {
        return locale.plural(
            Math.abs(pluralNumber),
            ...pluralForms.split(this.controller.pluralDelimiter)
        );
    }
}

export default Translator;
