
const trim = require('./trim');

const stringToRegex = (function () {

  function th(msg) {

    return new Error("stringToRegex error: " + msg);
  }

  let tt;
  const odd = str => {

    tt = trim(str, '\\', 'r');

    return (str.length - tt.length) % 2 === 1;
  }

  return v => {

    try {

      const first = v.substring(0, 1);

      if (first !== '/') {

        throw new Error(`param '${v}' doesn't seem to be proper regex`);
      }

      let vv = trim(v, '/').split('/')

      const tmp = [];

      let add = false;

      for ( let i = 0, l = vv.length, t ; i < l ; i += 1 ) {

        t = vv[i];

        if (tmp.length === 0) {

          tmp.push(t);
        }
        else {

          if ( add ) {

            tmp[tmp.length - 1] += '/' + t;
          }
          else {

            tmp.push(t);
          }
        }

        add = odd(t);
      }

      if (tmp.length > 2) {

        throw new Error(`param '${v}' splits to more than 2 segments`);
      }

      return new RegExp(tmp[0], tmp[1]);
    }
    catch (e) {

      throw th(`general error: string '${v}' error: ${e}`);
    }
  };
}());

module.exports = stringToRegex;