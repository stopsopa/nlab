/**
 * @doc https://github.com/stopsopa/nlab#color
 * c.r('message', ' in', ' red')
 * c('message', ' in', ' red', 'r')
 */
const node = require("./isNode");

let log;

if (node) {
  log = (...args) => process.stdout.write(args.join(" "));
} else {
  log = (function () {
    try {
      return console.log;
    } catch (e) {
      return () => {};
    }
  })();
}
// for testing in browser
// window.process = {
//     stdout: {
//         write: console.log
//     }
// }
// log = process.stdout.write;

const glos = {
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",
  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m", // red
  FgGreen: "\x1b[32m", // green
  FgYellow: "\x1b[33m", // yellow
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m", // magenta
  FgCyan: "\x1b[36m", // cyan
  FgWhite: "\x1b[37m",
  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m",
  r: "\x1b[31m", // red
  g: "\x1b[32m", // green
  b: "\x1b[34m", // blue
  y: "\x1b[33m", // yellow
  m: "\x1b[35m", // magenta
  c: "\x1b[36m", // cyan
  reset: "\x1b[0m",
};

// https://i.imgur.com/mWzuQWP.png
const color = (function (c) {
  return (...args) => c[args.pop()] + args.join("") + c.reset;
})(glos);

const c = (...args) => log(color(...args));

Object.keys(glos).forEach((k) => {
  c[k] = (...args) => color(...args, k);
});

module.exports = c;
