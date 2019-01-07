
const node = require('./isNode');

/**
 // navigator.userAgent:
 //    opera mac Version:57.0.3098.106 (on MacBook Pro macOS Mojave, 10.14.1 (18B75)):
 //        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
 //    google chrome Version 71.0.3578.98 (Official Build) (64-bit) (on MacBook Pro macOS Mojave, 10.14.1 (18B75)):
 //        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
 //    Safari Version 12.0.1 (14606.2.104.1.1) (on MacBook Pro macOS Mojave, 10.14.1 (18B75)):
 //        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.1 Safari/605.1.15"
 //    Firefox Quantum 64.0 (64-bit) (on MacBook Pro macOS Mojave, 10.14.1 (18B75)):
 //        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:64.0) Gecko/20100101 Firefox/64.0"
 //     chrome: Version 71.0.3578.98 (Official Build) (64-bit) (on Win 10 Pro)
 //         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
 //     Microsoft Edge 42.17134.1.0
 //         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134"
 //     Internet Explorer 11: Version 11.472.17134.0
 //         "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko"
 * @param ua
 * @returns {boolean}
 *
 * If you want to make it works in node and browser then do:
 *
 * getUserAgent((function () {try {return staticContext.req.headers['user-agent']}catch(e){}}()))
 */
module.exports = function (ua) {

    let u = false;

    let l;

    try {

        if (node) {

            if (typeof ua !== 'undefined') {

                u = ua;
            }

            if ( u === false ) {

                throw `getUserAgent: can't get userAgent`;
            }
        }
        else {

            u = navigator.userAgent
        }

        l = u.toLowerCase();
    }
    catch (e) {

        throw `getUserAgent: Can't detect browser: ` + (e + '');
    }

    return {
        u, l
    }
};