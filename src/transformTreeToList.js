const isObject = require("./isObject");

function internal(element, acc, parentKey, key) {
  const newKey = parentKey ? `${parentKey}.${key}` : key;

  if ((Array.isArray(element) || isObject(element)) && element !== null) {
    acc = { ...acc, ...transformTreeToList(element, newKey) };
  } else {
    acc[newKey] = element;
  }

  return acc;
}

function transformTreeToList(obj, parentKey = "") {
  let acc = {};

  if (Array.isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      acc = internal(obj[i], acc, parentKey, String(i));
    }
  }

  if (isObject(obj)) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        acc = internal(obj[key], acc, parentKey, key);
      }
    }
  }

  return acc;
}

module.exports = transformTreeToList;
