const formatHtmlLite = require("../../../formatHtmlLite");

const iterateDetailedLevels = formatHtmlLite.iterateDetailedLevels;

try {
  jest.setTimeout(100);
} catch (e) {}

describe("formatHtmlLite - iterateDetailedLevels", () => {
  it("001", (done) => {
    (async function () {
      try {
        const html = `<div id="test"><div    abc='def' ghi="jkl" test="abc def" test2 =abc def = val_key = "value test data">test</div></div>`;

        const expected = [
          [
            "opening",
            '<div id="test">',
            {
              tag: "div",
              attr: [["id", "test"]],
            },
            [],
          ],
          [
            "opening",
            '<div    abc=\'def\' ghi="jkl" test="abc def" test2 =abc def = val_key = "value test data">',
            {
              tag: "div",
              attr: [
                ["abc", "def"],
                ["ghi", "jkl"],
                ["test", "abc def"],
                ["val_key", "value test data"],
              ],
            },
            ["div"],
          ],
          ["data", "test", {}, ["div", "div"]],
          [
            "closing",
            "</div>",
            {
              tag: "div",
            },
            ["div"],
          ],
          [
            "closing",
            "</div>",
            {
              tag: "div",
            },
            [],
          ],
        ];

        const result = [];

        iterateDetailedLevels(html, (...args) => result.push(args));

        // console.log(JSON.stringify(result, null, 4));

        expect(result).toEqual(expected);

        done();
      } catch (e) {
        done({ general_error: e });
      }
    })();
  });

  it("002", (done) => {
    (async function () {
      try {
        const html = `<div><div><script>test<span></script></div></div>`;

        const expected = [
          [
            "opening",
            "<div>",
            {
              tag: "div",
              attr: [],
            },
            [],
          ],
          [
            "opening",
            "<div>",
            {
              tag: "div",
              attr: [],
            },
            ["div"],
          ],
          [
            "opening",
            "<script>",
            {
              tag: "script",
              attr: [],
            },
            ["div", "div"],
          ],
          ["closing", "test<span>", {}, ["div", "div", "script"]],
          [
            "closing",
            "</script>",
            {
              tag: "script",
            },
            ["div", "div"],
          ],
          [
            "closing",
            "</div>",
            {
              tag: "div",
            },
            ["div"],
          ],
          [
            "closing",
            "</div>",
            {
              tag: "div",
            },
            [],
          ],
        ];

        const result = [];

        iterateDetailedLevels(html, (...args) => result.push(args), ["script"]);

        // console.log(JSON.stringify(result, null, 4));

        expect(result).toEqual(expected);

        done();
      } catch (e) {
        done({ general_error: e });
      }
    })();
  });

  it("error 1", (done) => {
    (async function () {
      try {
        iterateDetailedLevels(false);

        done({ general_error: `shouldn't happen` });
      } catch (e) {
        expect(String(e)).toEqual("Error: formatHtmlLite.iterateDetailedLevels error: html parameter is not a string");

        done();
      }
    })();
  });

  it("error 2", (done) => {
    (async function () {
      try {
        iterateDetailedLevels("", false);

        done({ general_error: `shouldn't happen` });
      } catch (e) {
        expect(String(e)).toEqual(
          "Error: formatHtmlLite.iterateDetailedLevels error: event parameter is not a function",
        );

        done();
      }
    })();
  });

  it("error 3", (done) => {
    (async function () {
      try {
        const html = `<div id="test"><div    abc='def' ghi="jkl" test="abc def" test2 =abc def = val_key = "value test data">test<span></b></div></div>`;

        iterateDetailedLevels(html, () => {});

        done({ general_error: `shouldn't happen` });
      } catch (e) {
        expect(String(e)).toEqual(
          "Error: formatHtmlLite.iterateDetailedLevels error: closing wrong tag should be >span< but closing >b< - probably closing tag was missing",
        );

        done();
      }
    })();
  });
});
