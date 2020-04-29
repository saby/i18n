const EXPIRES_COOKIES = 2920;

module.exports = function() {
   return {
      '/locale': function(req, res) {
         const env = requirejs('Env/Env');

         if (req.query && req.query.lang && env.constants.availableLanguage.hasOwnProperty(req.query.lang)) {
            env.cookie.set('lang', req.query.lang, {
               path: '/',
               expires: EXPIRES_COOKIES
            });
         }

         const urlForRedirect = (req.query && req.query.url) ? req.query.url : `${req.protocol}://${req.hostname}`;

         res.redirect(urlForRedirect);
      }
   }
};
