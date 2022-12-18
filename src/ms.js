/**
 * @doc https://github.com/stopsopa/nlab#ms
 */
function th(msg) {
  throw new Error("nlab/ms library error: " + String(msg));
}

var dividers = {
  ms: 1,
  s: 1000,
  m: 60,
  h: 60,
  d: 24,
  y: 365,
};

var shift = {
  ms: 1000,
  s: 60,
  m: 60,
  h: 24,
  d: 365,
  y: 365,
};

var shiftkeys = Object.keys(shift);

var keys = Object.keys(dividers);

var dict = keys.reduce((acc, key) => {
  acc[key] = key;
  return acc;
}, {});

function ms(time, opt) {
  if (typeof opt === "string") {
    opt = {
      unit: opt,
    };
  }

  var tmp = Object.assign(
    {
      unit: "ms",
    },
    opt
  );

  tmp.dict = Object.assign({}, dict, tmp.dict || {});

  var t = raw(time, tmp.unit);

  return Object.keys(t)
    .reduce((acc, key) => {
      if (t[key]) {
        acc.unshift(String(t[key] + tmp.dict[key]));
      }

      return acc;
    }, [])
    .join(" ");
}

/**
 * https://github.com/stopsopa/nlab#ms
 */
function raw(time, unit) {
  if (typeof unit !== "string") {
    unit = "ms";
  }

  if (typeof time !== "number") {
    throw th("time is not a number");
  }

  if (!dividers[unit]) {
    throw th("unit '" + unit + "' is string but it is not on the list: '" + keys.join(", ") + "'");
  }

  var ret = {
    ms: 0,
    s: 0,
    m: 0,
    h: 0,
    d: 0,
    y: 0,
  };

  var list = shiftkeys.slice(shiftkeys.indexOf(unit));

  var div, tmp;

  for (var i = 0, l = list.length; i < l; i += 1) {
    tmp = list[i];

    div = shift[tmp];

    ret[tmp] = parseInt(time % div, 10);

    time -= ret[tmp];

    time /= div;
  }

  return ret;
}

function generate(opt, unit) {
  if (typeof unit !== "string") {
    unit = "ms";
  }

  if (!dividers[unit]) {
    throw th(`generate: unknown unit (${unit}), valid units are: '${keys.join(", ")}'`);
  }

  var t = 0;

  Object.keys(opt).forEach((k) => {
    if (k === "ms") {
      t += opt[k];

      return;
    }

    if (dividers[k]) {
      var tt = 1;

      keys.slice(0, keys.indexOf(k)).forEach((kk) => {
        tt *= shift[kk];
      });

      tt *= opt[k];

      t += tt;
    }
  });

  if (unit !== "ms") {
    keys.slice(0, keys.indexOf(unit)).forEach((u) => {
      t = parseInt(t / shift[u], 10);
    });
  }

  return t;
}

ms.raw = raw;

ms.generate = generate;

ms.shift = shift;

ms.dividers = dividers;

module.exports = ms;

/**
 * Old version used in roderic, but it is limited in its functionality
 */
// module.exports = (function () {
//     const pad = t => {
//         return (t + '').length < 2 ? pad('0' + t + '') : t ;
//     }
//     return s => {
//
//         const d = Math.floor(s / (3600 * 24));
//
//         s  -= d * 3600 * 24;
//
//         const h   = Math.floor(s / 3600);
//
//         s  -= h * 3600;
//
//         const m = Math.floor(s / 60);
//
//         s  -= m * 60;
//
//         const tmp = [];
//
//         (d) && tmp.push(d + 'd');
//
//         (d || h) && tmp.push(h + 'h');
//
//         (d || h || m) && tmp.push(m + 'm');
//
//         tmp.push(s + 's');
//
//         return tmp.join(' ');
//     }
// }());
