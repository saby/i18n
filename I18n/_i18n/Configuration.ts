import {cookie} from 'Env/Env';
import 'Core/polyfill';

const EXPIRES_COOKIES = 2920;

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
      cookie.set('lang', locale || null, {
         expires: EXPIRES_COOKIES,
         path: '/'
      });
   }

   static load(): string {
      return cookie.get('lang') || null;
   }

   static detect(request: IRequest, availableLocales: object): string {
      let detectedLocale = '';
      const acceptLocale = request && request.headers && request.headers['accept-language']
         && request.headers['accept-language'].split(',');

      if (acceptLocale) {
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

      return detectedLocale;
   }
}

export default Configuration;
