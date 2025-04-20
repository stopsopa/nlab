/**
 *
 * To create stream from file:
 * const stream = fs.createReadStream(file, { encoding: "utf8" });
 */
function iterateStreamLineByLine(stream, onLine, onClose) {
  return new Promise((resolve) => {
    let leftover = "";

    stream.on("data", (chunk) => {
      const combined = leftover + chunk;
      const lines = combined.split(/(\r\n|\r|\n)/); // keep EOL parts

      for (let i = 0; i < lines.length - 1; i += 2) {
        const line = lines[i] + lines[i + 1]; // line + EOL
        onLine(line);
      }

      leftover = lines[lines.length - 1];
    });

    stream.on("end", () => {
      if (leftover) {
        onLine(leftover); // Last line may not have EOL
      }
      if (typeof onClose === "function") {
        onClose();
      }
      resolve();
    });
  });
}

module.exports = iterateStreamLineByLine;
