// import isObject from './isObject';

const isObject = require("./isObject");

function sortObjectNested(data) {
  if (Array.isArray(data)) {
    return data.map((d) => sortObjectNested(d));
  }

  if (isObject(data)) {
    const keys = Object.keys(data);

    keys.sort();

    return keys.reduce((acc, key) => {
      acc[key] = sortObjectNested(data[key]);

      return acc;
    }, {});
  }

  return data;
}

module.exports = sortObjectNested;
