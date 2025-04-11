const { parseArgs } = require("node:util");

const fs = require("fs");

function out(line) {
  // fs.appendFileSync("out.txt", `out: ${line}\n`);
  process.stdout.write(`${line}\n`);
}

const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    test1: { type: "boolean" },
    exit1: { type: "boolean" },
    timeout: { type: "boolean" },
  },
  strict: true,
  allowPositionals: true,
  allowNegative: true,
});

if (values.test1) {
  out("hhhhhhhhh");

  process.exit(0);
}

if (values.exit1) {
  out("aaaaaaaaa");
  process.stderr.write(`bbbbbbbbb\n`);

  process.exit(1);
}

if (values.timeout) {
  out("cccccccccc");
  process.stderr.write(`ddddddddd\n`);

  setTimeout(() => {
    out("eeeeeeeeee");
    process.stderr.write(`fffffffff\n`);
    process.exit(2);
  }, 10000);
} else {
  out("gggggggggg");
  process.exit(10);
}

process.on("SIGTERM", () => {
  out("SIGTERM");
  process.exit(143);
});
