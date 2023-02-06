const each = require("./each");

const isArray = require("./isArray");

const isObject = require("./isObject");

function flat(data, skipArray) {
  if (skipArray && isArray(data)) {
    return data;
  }

  let buff = {};

  each(data, (val, key) => {
    if ((!skipArray && isArray(val)) || isObject(val)) {
      const entries = Object.entries(flat(val));

      const pairs = entries.reduce((acc, [key2, value]) => {
        acc[`${key}.${key2}`] = value;

        return acc;
      }, {});

      buff = {
        ...buff,
        ...pairs,
      };
    } else {
      buff[key] = val;
    }
  });

  return buff;
}

module.exports = flat;
