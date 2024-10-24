const formatHtmlLite = require("../../../formatHtmlLite");

const processAttributes = formatHtmlLite.processAttributes;

try {
  jest.setTimeout(100);
} catch (e) {}

describe("formatHtmlLite - processAttributes", () => {
  it("001", (done) => {
    (async function () {
      try {
        const html = `   abc='def' ghi="jkl" test="abc def" test2 =abc def = val_key = "value test data"`;

        const expected = [
          ["abc", "def"],
          ["ghi", "jkl"],
          ["test", "abc def"],
          ["val_key", "value test data"],
        ];

        const result = processAttributes(html);

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
        const html = `   abc='def' 
        
        ghi=
        
        "jkl" test="abc def" 
        test2 =abc def = 
        
        val_key = "value 
        test data"`;

        const expected = [
          ["abc", "def"],
          ["ghi", "jkl"],
          ["test", "abc def"],
          ["val_key", "value \n        test data"],
        ];

        const result = processAttributes(html);

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
        processAttributes(false);

        done({ general_error: `shouldn't happen` });
      } catch (e) {
        expect(String(e)).toEqual("Error: formatHtmlLite.processAttributes error: attr parameter is not a string");

        done();
      }
    })();
  });
});
