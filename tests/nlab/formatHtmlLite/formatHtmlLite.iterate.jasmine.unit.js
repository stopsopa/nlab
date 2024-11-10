const formatHtmlLite = require("nlab/formatHtmlLite.js");

const iterate = formatHtmlLite.iterate;

try {
  jest.setTimeout(100);
} catch (e) {}

describe("formatHtmlLite - iterate", () => {
  it("001", (done) => {
    (async function () {
      try {
        const html = `<div>test</div>`;

        const expected = [
          ["opening", "<div>"],
          ["data", "test"],
          ["closing", "</div>"],
        ];

        const result = [];

        iterate(html, (...args) => result.push(args));

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
        const html = `<div>test<br />end</div>`;

        const expected = [
          ["opening", "<div>"],
          ["data", "test"],
          ["selfclosing", "<br />"],
          ["data", "end"],
          ["closing", "</div>"],
        ];

        const result = [];

        iterate(html, (...args) => result.push(args));

        // console.log(JSON.stringify(result, null, 4));

        expect(result).toEqual(expected);

        done();
      } catch (e) {
        done({ general_error: e });
      }
    })();
  });

  it("003", (done) => {
    (async function () {
      try {
        const html = `start<div>midstart<br />midend</div>end`;

        const expected = [
          ["data", "start"],
          ["opening", "<div>"],
          ["data", "midstart"],
          ["selfclosing", "<br />"],
          ["data", "midend"],
          ["closing", "</div>"],
          ["data", "end"],
        ];

        const result = [];

        iterate(html, (...args) => result.push(args));

        // console.log(JSON.stringify(result, null, 4));

        expect(result).toEqual(expected);

        done();
      } catch (e) {
        done({ general_error: e });
      }
    })();
  });

  it("004", (done) => {
    (async function () {
      try {
        const html = `
        
        start
        
        <div>
        
        midstart
        
        <br />
        
        midend
        
        </div>
        
        end
        
        `;

        const expected = [
          ["data", "\n        \n        start\n        \n        "],
          ["opening", "<div>"],
          ["data", "\n        \n        midstart\n        \n        "],
          ["selfclosing", "<br />"],
          ["data", "\n        \n        midend\n        \n        "],
          ["closing", "</div>"],
          ["data", "\n        \n        end\n        \n        "],
        ];

        const result = [];

        iterate(html, (...args) => result.push(args));

        // console.log(JSON.stringify(result, null, 4));

        expect(result).toEqual(expected);

        done();
      } catch (e) {
        done({ general_error: e });
      }
    })();
  });

  it("005", (done) => {
    (async function () {
      try {
        const html = `start<div id="test" data-test="value">midstart<br />midend</div>end`;

        const expected = [
          ["data", "start"],
          ["opening", '<div id="test" data-test="value">'],
          ["data", "midstart"],
          ["selfclosing", "<br />"],
          ["data", "midend"],
          ["closing", "</div>"],
          ["data", "end"],
        ];

        const result = [];

        iterate(html, (...args) => result.push(args));

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
        iterate(false);

        done({ general_error: `shouldn't happen` });
      } catch (e) {
        expect(String(e)).toEqual("Error: formatHtmlLite.iterate error: html parameter is not a string");

        done();
      }
    })();
  });

  it("error 2", (done) => {
    (async function () {
      try {
        iterate("", false);

        done({ general_error: `shouldn't happen` });
      } catch (e) {
        expect(String(e)).toEqual("Error: formatHtmlLite.iterate error: event parameter is not a function");

        done();
      }
    })();
  });
});
