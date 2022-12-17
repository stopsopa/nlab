var generateSalt = (function () {
  let crypto = require("crypto");

  function th(msg) {
    return new Error("generateSalt error: " + String(msg));
  }

  return (characters) => {
    if (typeof characters === "undefined") {
      characters = 12;
    }

    if (!Number.isInteger(characters)) {
      throw th(`characters is not an integer`);
    }

    if (characters < 1) {
      throw th(`characters < 1`);
    }

    return crypto
      .randomBytes(Math.ceil(characters / 2))
      .toString("hex")
      .slice(0, characters);
  };
})();

module.exports = generateSalt;
