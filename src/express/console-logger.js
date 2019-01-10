/**
 * app.use(require('nlab/express/console-logger'));
 */
module.exports = (req, res, next) => {

    if ( ! res.clilogged ) {

        process.stdout.write(
            (new Date()).toISOString().substring(0, 19).replace('T', ' ') +
            ": controller " +
            req.method.toUpperCase().padEnd(4, ' ') +
            ":" +
            req.url +
            "\n"
        );
    }
    next();
};