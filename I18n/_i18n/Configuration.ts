import {cookie} from 'Env/Env';
import 'Core/polyfill';

const EXPIRES_COOKIES = 2920;

interface IRequest {
   query: IQuery;
   headers: IHeaders;
}

interface IQuery {
   lang: string;
}

interface IHeaders {
   'accept-language': string;
}

class Configuration {
   static isSet(request: IRequest): boolean {
      return !!(cookie.get('lang') || request && request.query && request.query.lang);
   }

   static save(locale: string): void {
      cookie.set('lang', locale || null, {
         expires: EXPIRES_COOKIES,
         path: '/'
      });
   }

   static load(request: IRequest): string {
      return (request && request.query && request.query.lang) || cookie.get('lang') || null;
   }

   static validate(request: IRequest): boolean {
      return !(request && request.query && request.query.lang && request.query.lang !== cookie.get('lang'));
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
