/**
 * app.use(require('nlab/express/console-logger'));
 */
module.exports = (req, res, next) => {
  process.stdout.write(
    new Date().toISOString().substring(0, 19).replace("T", " ") +
      ": controller " +
      req.method.toUpperCase().padEnd(4, " ") +
      ":" +
      req.url +
      "\n"
  );

  next();
};

/**
 *
 * Can be executed conditionally:
 *
    (function (logger) {
        app.use((req, res, next) => {

            if (req.url.indexOf('/public/') === 0 && req.url.split('.html').pop() !== '') { // ignore all public

                return next();
            }

            return logger(req, res, next);
        });
    }(require('nlab/express/console-logger')));
 */
