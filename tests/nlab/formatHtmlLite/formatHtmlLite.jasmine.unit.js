const formatHtmlLite = require("nlab/formatHtmlLite.js");

try {
  jest.setTimeout(100);
} catch (e) {}

describe("formatHtmlLite", () => {
  it("001", (done) => {
    (async function () {
      try {
        const html = `<div><div>test</div></div>`;

        const expected = `<div>
    <div>
        test
    </div>
</div>`;

        const result = formatHtmlLite(html);

        // console.log(`>>${result}<<`);

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
        const html = `<div><div>
        
        test
        
        </div><script>
        
        scriptdata
        
        
        </script>
        
        </div>`;

        const expected = `<div>
    <div>
        test
    </div>
    <script>
        scriptdata
    </script>
    
</div>`;

        const result = formatHtmlLite(html, { noTrimTags: [] });

        // console.log(`>>${result}<<`);

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
        const html = `<div><div>
        
        test
        
        </div><script>
        
        scriptdata
        
        <span> <br /> </span>
        
        
        </script>
        
        </div>`;

        const expected = `<div>
    <div>
        test
    </div>
    <script>
        
        scriptdata
        
        <span> <br /> </span>
        
        
        </script>
    
</div>`;

        const result = formatHtmlLite(html);

        // console.log(`>>${result}<<`);

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
        const html = `<div><div><br /></div></div>`;

        const expected = `<div>
    <div>
        <br />
    </div>
</div>`;

        const result = formatHtmlLite(html);

        // console.log(`>>${result}<<`);

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
        const html = `<body><div><script>
        
        scriptdata
        
        <span>before b
        
        <b> <br /> </span> </i>
        
        
</script>
        
              </div></body>`;

        const expected = `<body>
    <div>
        <script>
        
        scriptdata
        
        <span>before b
        
        <b> <br /> </span> </i>
        
        
</script>
        
    </div>
</body>`;

        const result = formatHtmlLite(html);

        // console.log(`>>${result}<<`);

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
        formatHtmlLite(false);

        done({ general_error: `shouldn't happen` });
      } catch (e) {
        expect(String(e)).toEqual("Error: formatHtmlLite error: html parameter is not a string");

        done();
      }
    })();
  });

  it("error 2", (done) => {
    (async function () {
      try {
        formatHtmlLite("", { noTrimTags: false });

        done({ general_error: `shouldn't happen` });
      } catch (e) {
        expect(String(e)).toEqual("Error: formatHtmlLite error: noTrimTags is not an array");

        done();
      }
    })();
  });

  it("error 3", (done) => {
    (async function () {
      try {
        formatHtmlLite("", { noTrimTags: [], spaces: -1 });

        done({ general_error: `shouldn't happen` });
      } catch (e) {
        expect(String(e)).toEqual("Error: formatHtmlLite error: spaces is not a number");

        done();
      }
    })();
  });
});
