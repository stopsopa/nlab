/**
 *
 const app = express();

 app.use(require('nlab/express/extend-res'));
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {
  if (!res.constructor.prototype.extended) {
    res.constructor.prototype.extended = true;

    res.constructor.prototype.jsonNoCache = function (json) {
      return this.set({
        "Cache-Control": "no-store, no-cache, must-revalidate",
        Pragma: "no-cache",
        "Content-type": "application/json; charset=utf-8",
        Expires: new Date().toUTCString(),
      }).json(json);
    };

    res.constructor.prototype.jsonError = function (errstring) {
      return this.status(409).jsonNoCache({
        error: errstring,
      });
    };

    res.constructor.prototype.notFound = function (msg) {
      return this.status(400).jsonNoCache({
        error: msg,
      });
    };

    res.constructor.prototype.accessDenied = function (msg) {
      return this.status(403).jsonNoCache({
        error: msg,
      });
    };

    /**

         (function () {

    var auth = require('basic-auth');

    app.use((req, res, next) => {

        // if (/^\/admin/.test(req.url)) {
        //
        //     var credentials = auth(req);
        //
        //     if (!credentials || credentials.name !== 'admin' || credentials.pass !== process.env.PROTECTED_ADMIN_PASS) {
        //
        //         res.statusCode = 401;
        //
        //         res.setHeader('WWW-Authenticate', 'Basic realm="Sign in"')
        //
        //         return res.end('Access denied');
        //     } else {
        //
        //         return next();
        //     }
        // }

        var credentials = auth(req);

        if (credentials && credentials.name === 'admin' && credentials.pass === process.env.PROTECTED_ADMIN_PASS) {

            req.auth = true;
        }

        next();
    });
}());

         // in controller:


         if ( ! req.auth ) {

                return res.basicAuth();
         }
         */

    res.constructor.prototype.basicAuth = function (realm = "Sign in", body = "Access denied") {
      this.status(401);

      this.setHeader("WWW-Authenticate", `Basic realm="${realm}"`);

      return this.end(body);
    };
  }

  next();
};
