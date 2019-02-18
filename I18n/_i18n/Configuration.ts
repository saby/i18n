/// <amd-module name="I18n/_i18n/Configuration" />
// @ts-ignore
import { cookie } from 'Env/Env';

const EXPIRES_COOKIES = 2920;

class Configuration {
    static has(request) {
        return !!(cookie.get('lang') || request && request.query && request.query.lang) ;
    }

    static set(language) {
        cookie.set('lang', language || null, {
            expires: EXPIRES_COOKIES,
            path: '/'
        });
    }

    static get() {
        return cookie.get('lang') || null;
    }

    static validate(request) {
        return !(request && request.query && request.query.lang && request.query.lang !== cookie.get('lang'));
    }

    static detect(request, availableLanguage) {
        let detectedLang = '';
        const acceptLang = request && request.headers && request.headers['accept-language']
            && request.headers['accept-language'].split(',');

        if (acceptLang) {
            acceptLang.some(langHeader => {
                const lang = langHeader.split(';')[0];

                if (lang.includes('-') && lang in availableLanguage) {
                    detectedLang = lang;
                    return true;
                } else if (!lang.includes('-')) {
                    for (const locale in availableLanguage) {
                        if (locale.startsWith(lang)) {
                            detectedLang = locale;
                            return true;
                        }
                    }
                }
            });
        }

        return detectedLang;
    }
}

export default Configuration;
