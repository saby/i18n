module.exports = function() {
   return {
      '/loadConfiguration': (req, res) => {

         const locale = req.query.locale || req.cookies.lang;
         const [language, country] = locale.split('-');

         const configLang = require(`I18n/locales/language/${language}`);
         const configCountry = require(`I18n/locales/language/${country}`);

         const config = {lang :configLang, cont: configCountry};

         if (typeof req.query.v !== 'undefined') {
            res.set('Cache-Control', 'public, max-age=315360000, immutable');
         }

         res.json(config);
      }
   };
};
