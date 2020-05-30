import {constants} from 'Env/Env';
import TranslatableString from './TranslatableString';

import ITranslator from './interfaces/ITranslator';
import IController from './interfaces/IController';
import ILocale from '../locales/Interfaces/ILocale';
import IContext from './interfaces/IContext';
import ITranslatableString from './interfaces/ITranslatableString';

class Translator implements ITranslator {
    constructor(private dictionaries: IContext, private controller: IController) {}

    translate(key: string, context?: string | number, pluralNumber?: number): string | ITranslatableString {
        if (typeof key === 'string') {
            let value = key;
            let contextValue = context;
            let pluralValue = pluralNumber;
            const index = key.indexOf(this.controller.contextSeparator);

            if (index > -1) {
                contextValue = key.substr(0, index);
                value = key.substr(index + this.controller.contextSeparator.length);
            }

            if (typeof context === 'number') {
                pluralValue = contextValue as number;
                contextValue = '';
            }

            if (constants.isServerSide) {
                return new TranslatableString({
                    key: value,
                    contextValue: contextValue as string,
                    pluralValue
                }, this);
            } else {
                return this.translateKey(value, contextValue as string, pluralValue);
            }
        } else {
            return key;
        }
    }

    translateKey(key: string, context?: string, pluralNumber?: number): string {
        const currentLocale = this.controller.currentLocaleConfig;
        let translatedKey;

        if (this.dictionaries.hasOwnProperty(currentLocale.code)) {
            if (pluralNumber !== undefined) {
                const pluralForms = this.getTranslatedKey( this.controller.pluralPrefix + key, context, currentLocale);

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
        const contextKey = context ? `${context}${this.controller.contextSeparator}${key}` : `${key}`;

        return this.dictionaries[locale.code][contextKey];
    }

    protected _translatePlural(pluralForms: string, pluralNumber: number, locale: ILocale): string {
        return locale.plural(Math.abs(pluralNumber), ...pluralForms.split(this.controller.pluralDelimiter));
    }
}

export default Translator;
