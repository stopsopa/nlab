const sortObjectNested = require("nlab/sortObjectNested.js");

const md5 = require("md5");

// the idea here is to generate some uniqe key from data passed to fetch
// in order to store it's response promises in cache under this key
function md5FetchArguments(url, opt) {
  const sorted = sortObjectNested([url, opt]);

  let method = opt?.method || "GET";

  method = method.toUpperCase();

  // normalizing method field to uppercase and setting it to GET if not defined
  if (typeof sorted?.[1]?.method === "string") {
    sorted[1].method = method;
  }

  const json = JSON.stringify(sorted);

  return `${url}:${method}:${md5(json)}`;
}

module.exports = md5FetchArguments;
