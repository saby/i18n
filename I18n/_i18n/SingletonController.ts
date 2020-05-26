import Controller, {IConfigController} from './Controller';
import Translator from './Translator';
import {IGlobal} from './interfaces/declaration';
import 'text';
import 'native-css';

const alias = {
    Core: 'WS.Core',
    Deprecated: 'WS.Core',
    Lib: 'WS.Core',
    Transport: 'WS.Core'
};

const configController = getConfig();

const controller = new Controller(configController);
const emptyTranslator = new Translator({}, controller);
const defaultTranslator = (
    key: string,
    context?: string | number,
    pluralNumber?: number) => emptyTranslator.translate(key, context, pluralNumber);

export default controller;

export function load(name: string, require: Require, onLoad: Function, config: object): void {
    if (configController.availableLocales && configController.availableLocales.length === 0) {
        onLoad(defaultTranslator);
    }

    const contextName = getContextName(name);

    if (!contextName) {
        onLoad(defaultTranslator);
    }

    controller.getTranslator(contextName).then((translator) => {
        onLoad(translator.translate.bind(translator));
    }).catch((err) => {
        onLoad(defaultTranslator);
    });
}

function getContextName(name: string): string {
    const contextName = name.split('/')[0];

    return alias.hasOwnProperty(contextName) ? alias[contextName] : contextName;
}

function getConfig(): IConfigController {
    const global = (function(): IGlobal {
        // tslint:disable-next-line:ban-comma-operator
        return this || (0, eval)('this');
    })();

    if (global.contents) {
        const availableLanguage = global.contents.availableLanguage;
        return {
            availableLocales: availableLanguage && prepareAvailableLanguage(availableLanguage),
            defaultLocale: global.contents.defaultLanguage,
            availableContexts: global.contents.modules
        };
    }

    return {};
}

function prepareAvailableLanguage(availableLanguage: object): string[] {
    const result = [];

    for (const locale of Object.keys(availableLanguage)) {
        if (Controller.isLocaleCode(locale)) {
            result.push(locale);
        }
    }

    return result;
}
