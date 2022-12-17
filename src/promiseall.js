/**
 * @doc https://github.com/stopsopa/nlab#promiseall
 */

function th(msg) {
  return new Error("promiseall error: " + msg);
}

var promiseall = (list) => {
  if (!Array.isArray(list)) {
    throw th("list is not an array");
  }

  let counter = list.length;

  if (counter === 0) {
    return Promise.resolve([]);
  }

  var err = false;

  for (var i = 0, l = list.length, t; i < l; i += 1) {
    if (
      typeof list[i] === "function" &&
      list[i].constructor.name === "AsyncFunction"
    ) {
      list[i] = Promise.resolve(list[i]());
    }

    t = list[i];

    if (!t || typeof t.then !== "function") {
      err = th("list[" + i + "] is not a promise");
    } else {
      t.then(
        () => {},
        () => {}
      );
    }
  }

  if (err) {
    throw err;
  }

  let resolved = true;

  const errors = [];

  return new Promise((resolve, reject) => {
    const ok = (i) => (data) => {
      counter -= 1;

      errors[i] = {
        resolved: true,
        data,
      };

      if (counter === 0) {
        resolved ? resolve(errors.map((x) => x.data)) : reject(errors);
      }
    };

    const wrong = (i) => (data) => {
      counter -= 1;

      resolved = false;

      errors[i] = {
        resolved: false,
        data,
      };

      if (counter === 0) {
        reject(errors);
      }
    };

    list.forEach((l, i) => Promise.resolve(l).then(ok(i), wrong(i)));
  });
};

module.exports = promiseall;
