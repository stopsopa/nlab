
const getUserAgent = require('./getUserAgent');

/**
 * @param ua
 * @returns {boolean}
 *
 * If you want to make it works in node and browser then do:
 *
 * isGoogleChrome((function () {try {return staticContext.req.headers['user-agent']}catch(e){}}()))
 */
module.exports = function (ua) {

    const {
        u,l
    } = getUserAgent(ua);

    return l.indexOf('chrome') > -1
        && l.indexOf('chromium') === -1
        && l.indexOf('opr') === -1
    ;
};