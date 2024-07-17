import constants from 'Env/Constants';

import TranslatableString from './TranslatableString';

import IController from '../interfaces/IController';
import ILocale from '../interfaces/ILocale';
import IContext from '../interfaces/IContext';
import { langCode } from '../interfaces/IAvailableCodes';

const CONTEXT_SEPARATOR = '@@';
const PLURAL_PREFIX = 'plural#';
const TEMPLATE_PREFIX = 'template#';
const PLURAL_DELIMITER = '|';

/**
 * Класс переводчика. Содержит API для локализации строковых значений.
 * @public
 * @author Кудрявцев И.С.
 */
class Translator {
    constructor(private dictionaries: IContext, private controller: IController) {}

    translate(
        key: string,
        context?: string | number,
        pluralNumber?: number,
        isTemplate?: boolean
    ): string | TranslatableString | String {
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
                    return this.translateKey(key, contextValue as string, pluralValue, isTemplate);
                });
            } else {
                return this.translateKey(key, contextValue as string, pluralValue, isTemplate);
            }
        }

        return key;
    }

    setDictionaries(dictionaries: IContext): void {
        this.dictionaries = dictionaries;
    }

    translateKey(
        key: string,
        context?: string,
        pluralNumber?: number,
        isTemplate?: boolean
    ): string {
        const currentLocale = this.controller.currentLocaleConfig;
        const code = this.controller.currentLang;
        let prefix = '';
        let translatedKey;

        if (this.dictionaries.hasOwnProperty(code)) {
            if (isTemplate) {
                prefix = TEMPLATE_PREFIX;
            }

            if (pluralNumber !== undefined) {
                const pluralForms = this.getTranslatedKey(
                    PLURAL_PREFIX + prefix + key,
                    code,
                    context
                );

                if (pluralForms) {
                    translatedKey = this._translatePlural(pluralForms, pluralNumber, currentLocale);
                }
            } else {
                translatedKey = this.getTranslatedKey(prefix + key, code, context);
            }
        }

        return translatedKey === undefined ? key : translatedKey;
    }

    protected getTranslatedKey(key: string, code: langCode, context?: string): string {
        const contextKey = context ? `${context}${CONTEXT_SEPARATOR}${key}` : `${key}`;

        return this.dictionaries[code][contextKey];
    }

    protected _translatePlural(pluralForms: string, pluralNumber: number, locale: ILocale): string {
        return locale.plural(Math.abs(pluralNumber), ...pluralForms.split(PLURAL_DELIMITER));
    }
}

export default Translator;
