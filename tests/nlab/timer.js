let cache = undefined;

function now() {
  return parseInt(new Date().getTime(), 10);
}

function diff(given) {
  let tmp;

  if (typeof given === "undefined") {
    if (cache === undefined) {
      throw `cache nor given are not initialized`;
    } else {
      tmp = cache;
    }
  } else {
    tmp = given;
  }

  const d = now() - tmp;

  cache = undefined;

  return d;
}

function start() {
  return (cache = now());
}

module.exports = {
  now,
  start,
  diff,
};
