const crypto = require("crypto");

const md5 = require("md5");

const IV_LENGTH = 16; // For AES, this is always 16

/**
 * https://gist.github.com/vlucas/2bd40f62d20c1d49237a109d491974eb
 *
 * @doc https://github.com/stopsopa/nlab#aes256
 */
module.exports = (pass) => {
  const md5buff = Buffer.from(md5(pass));

  return {
    encrypt: function (text) {
      let iv = crypto.randomBytes(IV_LENGTH);
      let cipher = crypto.createCipheriv("aes-256-cbc", md5buff, iv);
      let encrypted = cipher.update(text);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return iv.toString("hex") + ":" + encrypted.toString("hex");
    },
    decrypt: function (text) {
      let textParts = text.split(":");
      let iv = Buffer.from(textParts.shift(), "hex");
      let encryptedText = Buffer.from(textParts.join(":"), "hex");
      let decipher = crypto.createDecipheriv("aes-256-cbc", md5buff, iv);
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return decrypted.toString();
    },
  };
};
