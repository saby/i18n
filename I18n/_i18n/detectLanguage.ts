
/**
 * Функция опрделения языка из настройки браузера.
 */
function _detectLanguageBrowser(request) {
    let detectedLang = this.defaultLanguage;
    const acceptLang = request && request.headers && request.headers['accept-language']
        && request.headers['accept-language'].split(',');

    if (acceptLang) {
        acceptLang.some(langHeader => {
            const lang = langHeader.split(';')[0];

            if (lang.includes('-') && this.hasLang(lang)) {
                detectedLang = lang;
                return true;
            } else if (!lang.includes('-')) {
                for (const locale in this.availableLanguage) {
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

export default () => {
    if (constants.isNodePlatform) {
        let detectedLang = this.defaultLanguage;
        const request = process.domain && process.domain.req;

        if (request) {
            const reqCookie = cookie.get('lang');
            const queryLang = request.query && request.query.lang;

            detectedLang = queryLang || reqCookie || this._detectLanguageBrowser(request);
            detectedLang = this.hasLang(detectedLang) ? detectedLang : this.defaultLanguage;

            if (queryLang || !reqCookie) {
                this._setLocalOnNodeJS(detectedLang, process.domain);
            }
        }

        return detectedLang;
    }

    if (I18n.isEnabled()) {
        const avLang = this.availableLanguage;
        let detectedLang = cookie.get('lang') || '';

        if (!detectedLang) {
            detectedLang = this.defaultLanguage;
        }

        // Если уже ничто не помогло, Возьмем первый язык из доступных
        if (!detectedLang || detectedLang.length !== 5 || !avLang[detectedLang]) {
            detectedLang = Object.keys(avLang)[0] || '';
        }

        return detectedLang;
    }

    return '';
}
