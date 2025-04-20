// import iterateStreamLineByLine from "nlab/iterateStreamLineByLine";
const iterateStreamLineByLine = require("nlab/iterateStreamLineByLine.js");

// import { Readable } from "stream";
const { Readable } = require("stream");

// import fs from "fs";
const fs = require("fs");

// import path from "path";
const path = require("path");

const stringToStream = (str) => {
  const readable = new Readable();
  readable.push(str);
  readable.push(null); // Push null to signal the end of the stream
  return readable;
};

function transformLineEnds(str) {
  // make end lines visible liie transform newline to string '\n' and so on
  return str.replace(/\r\n/g, "\\r\\n").replace(/\n/g, "\\n").replace(/\r/g, "\\r");
}

describe("iterateStreamLineByLine", () => {
  it("simple", async () => {
    const input = `line1\nline2\nline3`;

    const stream = stringToStream(input);

    const output = [];
    await iterateStreamLineByLine(
      stream,
      (line) => {
        output.push(transformLineEnds(line));
      },
      () => {
        output.push("<end>");
      },
    );

    expect(output).toEqual(["line1\\n", "line2\\n", "line3", "<end>"]);
  });

  it("no newlines - restult odd number of splits", async () => {
    const input = `line1`;

    const stream = stringToStream(input);

    const output = [];
    await iterateStreamLineByLine(stream, (line) => {
      output.push(transformLineEnds(line));
    });

    expect(output).toEqual(["line1"]);
  });

  // it("file", async () => {
  //   const file = path.join(process.cwd(), "libs", "iterateStreamLineByLine.txt");

  //   const stream = fs.createReadStream(file, { encoding: "utf8" });

  //   const output = [];
  //   await iterateStreamLineByLine(stream, (line) => {
  //     output.push(transformLineEnds(line));
  //   });

  //   expect(output).toEqual(["abc\\n", "def\\n", "ghi"]);
  // });

  it("\\r\\n", async () => {
    const input = `\r\n\r\nline1\r\nline2\r\nline3\r\n\r\n`;

    const stream = stringToStream(input);

    const output = [];
    await iterateStreamLineByLine(stream, (line) => {
      output.push(transformLineEnds(line));
    });

    expect(output).toEqual(["\\r\\n", "\\r\\n", "line1\\r\\n", "line2\\r\\n", "line3\\r\\n", "\\r\\n"]);
  });

  it("\\r\\n", async () => {
    const input = `\rline1\r\nline2\nline3\n`;

    const stream = stringToStream(input);

    const output = [];
    await iterateStreamLineByLine(stream, (line) => {
      output.push(transformLineEnds(line));
    });

    expect(output).toEqual(["\\r", "line1\\r\\n", "line2\\n", "line3\\n"]);
  });

  it("empty leftover - when chunk ends exactly at line boundary", async () => {
    const input = "line1\n";

    const stream = stringToStream(input);

    const output = [];
    await iterateStreamLineByLine(stream, (line) => {
      output.push(transformLineEnds(line));
    });

    expect(output).toEqual(["line1\\n"]);
  });

  it("try else in ternary", async () => {
    const input = "";

    const stream = stringToStream(input);

    const output = [];
    await iterateStreamLineByLine(stream, (line) => {
      output.push(transformLineEnds(line));
    });

    expect(output).toEqual([]); // Just one complete line with newline
  });
});
