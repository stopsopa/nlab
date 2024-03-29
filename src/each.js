const isArray = require("./isArray");

const isObject = require("./isObject");

function each(obj, fn, context) {
  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; ++i) {
      if (fn.call(context, obj[i], i) === false) {
        return;
      }
    }
  } else if (isObject(obj)) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        if (fn.call(context, obj[i], i) === false) {
          return;
        }
      }
    }
  }
}

module.exports = each;
