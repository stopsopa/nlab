const formatHtmlLite = require("nlab/formatHtmlLite.js");

const iterateDetailed = formatHtmlLite.iterateDetailed;

try {
  jest.setTimeout(100);
} catch (e) {}

describe("formatHtmlLite - iterateDetailed", () => {
  it("001", (done) => {
    (async function () {
      try {
        const html = `<div id="test"><div    abc='def' ghi="jkl" test="abc def" test2 =abc def = val_key = "value test data">test<br /></div></div>`;

        const expected = [
          [
            "opening",
            '<div id="test">',
            {
              tag: "div",
              attr: [["id", "test"]],
            },
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
          ],
          ["data", "test", {}],
          [
            "selfclosing",
            "<br />",
            {
              tag: "br",
            },
          ],
          [
            "closing",
            "</div>",
            {
              tag: "div",
            },
          ],
          [
            "closing",
            "</div>",
            {
              tag: "div",
            },
          ],
        ];

        const result = [];

        iterateDetailed(html, (...args) => result.push(args));

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
        iterateDetailed(false);

        done({ general_error: `shouldn't happen` });
      } catch (e) {
        expect(String(e)).toEqual("Error: formatHtmlLite.iterateDetailed error: html parameter is not a string");

        done();
      }
    })();
  });

  it("error 2", (done) => {
    (async function () {
      try {
        iterateDetailed("", false);

        done({ general_error: `shouldn't happen` });
      } catch (e) {
        expect(String(e)).toEqual("Error: formatHtmlLite.iterateDetailed error: event parameter is not a function");

        done();
      }
    })();
  });
});
