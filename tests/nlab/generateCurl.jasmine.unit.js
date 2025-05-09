const generateCurl = require("nlab/generateCurl.js");

it("generateCurl all parts - no multiline", (done) => {
  try {
    const result = generateCurl({
      url: "http://domain.com/path/endpoint",
      method: "post",
      headers: {
        "Content-type": "application/json; charset=utf-8",
        "X-custom": "custom-value",
      },
      body: {
        some: "data",
      },
    });

    const expected = `curl -XPOST -H "Content-type: application/json; charset=utf-8" -H "X-custom: custom-value" -d '{"some":"data"}' http://domain.com/path/endpoint`;

    expect(result).toEqual(expected);

    done();
  } catch (e) {
    done(String(e));
  }
});

it("generateCurl all parts - multiline", (done) => {
  try {
    const result = generateCurl({
      url: "http://domain.com/path/endpoint",
      method: "post",
      headers: {
        "Content-type": "application/json; charset=utf-8",
        "X-custom": "custom-value",
      },
      body: {
        some: "data",
      },
      multiline: true,
    });

    const expected = `curl \\
-XPOST \\
-H "Content-type: application/json; charset=utf-8" \\
-H "X-custom: custom-value" \\
-d '{
    "some": "data"
}' \\
http://domain.com/path/endpoint`;

    expect(result).toEqual(expected);

    done();
  } catch (e) {
    done(String(e));
  }
});

it("generateCurl all parts - slashParenthesis", (done) => {
  try {
    const result = generateCurl({
      url: "http://domain.com/path/endpoint",
      headers: {
        "Content-type": "application/json; charset=utf-8",
        "X-custom": 'custom-"value',
      },
      body: {
        some: "data",
      },
      multiline: true,
    });

    const expected = `curl \\
-H "Content-type: application/json; charset=utf-8" \\
-H "X-custom: custom-\\"value" \\
-d '{
    "some": "data"
}' \\
http://domain.com/path/endpoint`;

    expect(result).toEqual(expected);

    done();
  } catch (e) {
    done(String(e));
  }
});

it("generateCurl all parts - url not defined", (done) => {
  try {
    generateCurl({});

    done(`Shouldn't reach this point`);
  } catch (e) {
    expect(String(e)).toEqual(`Error: buildCurl error: url is not a string - not defined`);

    done();
  }
});

it("generateCurl all parts - no headers", (done) => {
  try {
    const result = generateCurl({ url: "x" });

    const expected = `curl x`;

    expect(result).toEqual(expected);

    done();
  } catch (e) {
    done(`Shouldn't reach this point`);

    throw e;
  }
});

it("generateCurl all parts - headers not an object", (done) => {
  try {
    generateCurl({ url: "x", headers: null });

    done(`Shouldn't reach this point`);
  } catch (e) {
    expect(String(e)).toEqual(
      "Error: buildCurl error: headers if defined should be an object, but it is >[object Null]<",
    );

    done();
  }
});

it("generateCurl all parts - headers empty object", (done) => {
  try {
    const result = generateCurl({ url: "x", headers: {} });

    const expected = `curl x`;

    expect(result).toEqual(expected);

    done();
  } catch (e) {
    done(`Shouldn't reach this point`);

    throw e;
  }
});

it("generateCurl all parts - headers value not string", (done) => {
  try {
    const result = generateCurl({ url: "x", headers: { "X-test": true } });

    const expected = `curl x`;

    expect(result).toEqual(expected);

    done();
  } catch (e) {
    done(`Shouldn't reach this point`);

    throw e;
  }
});

it("generateCurl all parts - body as a string", (done) => {
  try {
    const result = generateCurl({ url: "x", body: '{"key":"value"}' });

    const expected = `curl -d '{"key":"value"}' x`;

    expect(result).toEqual(expected);

    done();
  } catch (e) {
    done(`Shouldn't reach this point`);

    throw e;
  }
});

it("generateCurl all parts - body not object, array or string", (done) => {
  try {
    generateCurl({ url: "x", body: 6 });

    done(`Shouldn't reach this point`);
  } catch (e) {
    expect(String(e)).toEqual(
      "Error: buildCurl error: body if defined should be an object, array or string but it is >[object Undefined]<",
    );

    done();
  }
});
