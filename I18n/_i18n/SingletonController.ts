import Controller, {IConfigController} from './Controller';
import Translator from './Translator';
import {IGlobal} from './interfaces/declaration';
import {constants, cookie} from 'Env/Env';
import 'text';
import 'native-css';

const alias = {
    Core: 'WS.Core',
    Deprecated: 'WS.Deprecated',
    Lib: 'WS.Core',
    Transport: 'WS.Core'
};
const EXPIRES_IGNORE_LANG_BL = 365;

const configController = getConfig();

const controller = new Controller(configController);
const emptyTranslator = new Translator({}, controller);
const defaultTranslator = (
    key: string,
    context?: string | number,
    pluralNumber?: number) => emptyTranslator.translate(key, context, pluralNumber);

export default controller;

export function load(name: string, require: Require, onLoad: Function): void {
    if (name.includes('controller?')) {
        controller.isReady().then(() => {
           onLoad(controller);
        });

        return;
    }

    if (!controller.isEnabled) {
        onLoad(defaultTranslator);

        return;
    }

    const contextName = getContextName(name);

    if (!contextName) {
        onLoad(defaultTranslator);

        return;
    }

    if (constants.isServerSide) {
        let translate = defaultTranslator;

        controller.getTranslator(contextName).then((translator) => {
            translate = translator.translate.bind(translator);
        }).catch((err) => {
            translate = defaultTranslator;
        });

        onLoad((key: string,
                context?: string | number,
                pluralNumber?: number) => {
            return translate(key, context, pluralNumber);
        });

        return;
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

    const config = {
        defaultLocale: 'ru-RU'
    };

    if (global.contents) {
        const availableLanguage = global.contents.availableLanguage;

        if (constants.isBrowserPlatform) {
            setLocalizationBL(availableLanguage);
        }

        return {
            availableLocales: availableLanguage && prepareAvailableLanguage(availableLanguage),
            defaultLocale: global.contents.defaultLanguage || config.defaultLocale,
            availableContexts: global.contents.modules
        };
    }

    return config;
}

/* Диспетчер выставляет единую куки lang по всем приложениям персоны, но есть приложения,
которые могут не поддерживать выбранный язык, ui-локализация имеет информацию о доступных языках для приложения,
но в BL-локализации такой инормации нет и она переводит ключи согласно переданной куке lang,
в результате компоненты, которые имеют поддержку локали установленой в куке lang, вернутся переведёнными,
в итоге получаем частично лоаклизованный интерфейс.
Пример: reg.tensor и online имеют общие компоненты, но reg не поддерживает английский язык,
а персона у приложений общая, в результате данные с бл для общих компонентов приходят в английской локале.
Поэтому выставляем куку, которая скажет BL-локализации, что надо игнорировать локаль из куки и брать дефолтную.  */
function setLocalizationBL(availableLanguage: object = {}): void {
    if (!availableLanguage.hasOwnProperty(cookie.get('lang'))) {
        cookie.set('bl_lang_ignore', 1, {
            expires: EXPIRES_IGNORE_LANG_BL,
            path: '/'
        });
    } else if (cookie.get('bl_lang_ignore')) {

        // Если для приложения есть поддержка указаного языка, то надо убрать куку для bl.
        cookie.set('bl_lang_ignore', null,  { path: '/' });
    }
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
