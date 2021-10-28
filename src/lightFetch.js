
// yarn add qs@^6

const URL           = require('url').URL;

const https         = require('https');

const http          = require('http');

// const querystring   = require('querystring');

const qs            = require('qs');

const name          = 'nlab/lightFetch';

const emsg          = msg => `${name}: ${msg}`;

const def = {
  method                : 'GET',
  timeout               : 30 * 1000,
  query                 : {},
  headers               : {},
  body                  : undefined,
  nobody                : false,

  // If you wish lightFetch to automatically decode json:
  // true     - try always try decode - if it fail
  // false    - disabled - return body as is
  // 'header' - only if Content-type; application/json header detected
  // If conditions will be on for parsing json and JSON.parse throw an error it will result
  // in promise lightFetch to be returned in rejected state with JSON.parse error forwarded in it
  decodeJson            : 'header',
  promiseResolvingStatusCodes  : res => {
    return res.statusCode >= 200 && res.statusCode < 300;
  },

  /**
   * Additional internal parameters vvv
   */
  // qsOptions is to inject custom parameters for 'qs' library
  qsOptions: {}, // https://github.com/ljharb/qs#stringifying

  // parameter serves to print to the screen more informations about request or response
  // req  - print request
  // res  - print response
  // reqb - print also body of request (by default body is skipped)
  // resb - print also body of response (by default body is skipped)
  // you can combine values like 'req resb',
  // obviously 'all' value turn all
  debugRequest          : '',

  // debugRequest use JSON.stringify to print data on the server output, jsonSpace will help in formatting
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#syntax
  jsonSpace: 2,
};

const defKeys = Object.keys(def);

module.exports = function (url, opt = {}) {

  Object.keys(opt || {}).forEach(key => {

    if ( ! defKeys.includes(key) ) {

      throw new Error(emsg(`key '${key}' is not on the list of allowed parameters ${defKeys.join(', ')}`));
    }
  });

  let {
    method,
    timeout,
    query,
    headers,
    debugRequest,
    body,
    nobody,
    decodeJson,
    promiseResolvingStatusCodes,
    qsOptions,
    jsonSpace,
  } = ({
    ...def,
    ...opt,
  });

  if ( typeof debugRequest !== 'string' ) {

    throw new Error(emsg(`debugRequest is not a string`));
  }

  if ( debugRequest === 'all' ) {

    debugRequest = 'reqb resb'
  }

  if ( typeof method !== 'string' ) {

    throw new Error(emsg(`method is not a string`));
  }

  method = method.toUpperCase();

  const uniq = unique();

  return new Promise((resolve, reject) => {

    try {

      const uri   = new URL(url);

      const lib   = (uri.protocol === 'https:') ? https : http;

      const uriParamsAsRegularObject = Array.from(uri.searchParams.keys()).reduce((acc, key) => {
        acc[key] = uri.searchParams.getAll(key);
        return acc;
      }, {});

      const combinedQuery = {
        ...query,
        ...uriParamsAsRegularObject
      };

      const querystring = qs.stringify(combinedQuery, qsOptions);

      // const querystring = querystring.stringify(combinedQuery)

      let rawBody = body;

      if (body !== undefined && method === 'GET') {

        throw new Error(emsg(`since you have specified the body for request probably method shouldn't be GET`));
      }

      // body is not a string, so probably it need to be sent as a json
      if (isObject(body) || Array.isArray(body)) {

        try {

          body = JSON.stringify(body);
        }
        catch (e) {

          e.message = emsg(`JSON.stringify error: ${e}`);

          return reject(e);
        }

        headers['Content-Type'] = 'application/json; charset=utf-8';
      }

      const request = {
        hostname    : uri.hostname,
        port        : uri.port || ( (uri.protocol === 'https:') ? '443' : '80'),
        path        : uri.pathname + (querystring.length > 0 ? `?${querystring}` : ''),
        method,
        headers,
      };

      const rq = {
        url,
        ...request,
      }

      if (debugRequest.includes('reqb')) {

        rq.body = body;

        rq.rawBody = rawBody;
      }

      if (debugRequest.includes('req')) {

        console.log(`${name} request ${uniq}:`, JSON.stringify(rq, null, jsonSpace));
      }

      let error;

      var req = lib.request(request, res => {

        res.setEncoding('utf8');

        let body = '';

        res.on('data', chunk => {

          body += chunk
        });

        res.on('end', async () => {

          try {

            if (
              decodeJson === true
              || (
                decodeJson === 'header'
                && (res.headers['Content-type'] || '').toLowerCase().includes('application/json')
              )
            ) {

              try {

                body = JSON.parse(body);
              }
              catch (e) {

                e.message = emsg(`JSON.parse(response body) error: ${e}`);

                return reject(e);
              }
            }

            if ( ! await promiseResolvingStatusCodes(res) ) {

              error = `Not resolving response status code (param function 'promiseResolvingStatusCodes'), current status is: ${res.statusCode}`;

              return reject(new Error(emsg(error)));
            }

            const rs = {
              status: res.statusCode,
              headers: res.headers,
            };

            const payload = {
              uniq,
              ...rs
            };

            if (nobody === false) {

              payload.body = body;
            }

            if (debugRequest.includes('resb')) {

              rs.body = body;
            }

            if (debugRequest.includes('res')) {

              console.log(`${name} response ${uniq}:`, JSON.stringify(rs, null, jsonSpace));
            }

            resolve(payload)
          }
          catch (e) {

            e.message = emsg(`lib.request end method error: ${e}`);

            return reject(e);
          }
        });
      });

      req.on('socket', function (socket) {

        socket.setTimeout(timeout);

        socket.on('timeout', () => { // https://stackoverflow.com/a/9910413

          try {
            req.destroy();
          }
          catch (e) {
            try {
              req.abort(); // since node v14.1.0 Use request.destroy() instead
            }
            catch (e) {}
          }

          reject(new Error(emsg(`timeout (${timeout}ms)`)));
        });
      });

      req.on('error', e => reject(new Error(emsg(`on error: ${e}`))));

      body && req.write(body);

      req.end();
    }
    catch (e) {

      reject(new Error(emsg(`general error: ${e}`)));
    }
  });
}

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function unique(pattern) {
  pattern || (pattern = 'xyxyxy');
  return pattern.replace(/[xy]/g,
    function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}