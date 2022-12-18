"use strict";

const isArray = require("./isArray");

/**
 * @doc https://github.com/stopsopa/nlab#del
 */
const del = function (source, key) {
  // log('key', key);
  // log('source', source)

  if (typeof key !== "string" && !isArray(key)) {
    throw new Error("nlab/del error: key is not a string nor array");
  }

  if (typeof key === "string" && key.indexOf(".") > -1) {
    key = key.split(".");
  }

  if (!isArray(key)) {
    key = [key];
  }

  key.forEach((k) => {
    if (typeof k !== "string") {
      throw new Error("nlab/del error: one of the keys in the array is not a string");
    }
  });

  let tmp = source,
    k;

  try {
    while ((k = key.shift())) {
      if (key.length) {
        tmp = tmp[k];
      } else {
        if (isArray(tmp)) {
          tmp.splice(k, 1);
        } else {
          delete tmp[k];
        }

        return;
      }
    }
  } catch (e) {
    // throw new Error(`nlab/del general catch error: ${e}`);
  }
};

module.exports = del;
