import { cookie } from 'Env/Env';
import constants from './Const';

interface IRequest {
   headers: IHeaders;
}

interface IHeaders {
   'accept-language': string;
}

/**
 * Статический класс для работы с конфигурацией интернационализации.
 * class I18n/_i18n/Configuration
 * @public
 * @author Кудрявцев И.С.
 */
class Configuration {
   static isSet(): boolean {
      return !!(cookie.get('lang'));
   }

   static save(locale: string): void {
      cookie.set('lang', locale, {
         expires: constants.expiresCookies,
         path: '/'
      });
   }

   static load(): string {
      const code = cookie.get('lang');

      if (code) {
         if (code.length === constants.lengthOfLangCode && constants.defaultCountry[code]) {
            return `${code}-${constants.defaultCountry[code]}`;
         } else {
            return code;
         }
      }

      return '';
   }

   static detect(request: IRequest, availableLocales: object): string {
      let detectedLocale = '';
      const acceptLocale = request && request.headers && request.headers['accept-language']
         && request.headers['accept-language'].split(',');

      if (acceptLocale && Object.keys(availableLocales).length !== 0) {
         acceptLocale.some((localeHeader) => {
            const locale = localeHeader.split(';')[0];

            if (locale.includes('-') && locale in availableLocales) {
               detectedLocale = locale;
               return true;
            } else if (!locale.includes('-')) {
               for (const availableLocale in availableLocales) {
                  if (availableLocale.startsWith(locale)) {
                     detectedLocale = availableLocale;
                     return true;
                  }
               }
            }
         });
      }

      if (detectedLocale.length === constants.lengthOfLangCode && constants.defaultCountry[detectedLocale]) {
         detectedLocale = `${detectedLocale}-${constants.defaultCountry[detectedLocale]}`;
      }

      return detectedLocale;
   }
}

export default Configuration;
