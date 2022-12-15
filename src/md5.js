/**
 * usage:
 *
 * as require but also:
 *
 * echo -n 'str' | node md5.js
 */
var crypto = require("crypto");

function md5(str) {
  return crypto.createHash("md5").update(str).digest("hex");
}

module.exports = md5;

if (require.main === module) {
  const readline = require("readline");

  const rl = readline.createInterface({
    input: process.stdin,
  });

  let buff = "";

  rl.on("line", (line) => {
    if (buff !== "") {
      buff += "\n";
    }

    if (line === "") {
      buff += "\n";
    } else {
      buff += line;
    }
  });

  rl.on("close", (e) => {
    process.stdout.write(md5(buff));
  });
}
