const lightFetch = require("../../lightFetch");

require("dotenv-up")(3, true, "test/nlab/lightFetch.js");

const se = require("../../se");

function fetch(url, opt) {
  return lightFetch(`http://${process.env.NODE_API_HOST}:${process.env.NODE_API_PORT}${url}`, opt);
}

function fetchCrush(url, opt) {
  return lightFetch(`http://${process.env.NODE_API_HOST}:${process.env.CRASH_PORT}${url}`, opt);
}

function cleanHeaders(req) {
  delete req.uniq;
  delete req.headers.etag;
  delete req.headers.date;
  delete req.headers.connection;
  delete req.headers["content-length"];
  delete req.headers["keep-alive"];
}

it(`REPO_COVERALLS_URL https url`, (done) => {
  expect(typeof process.env.REPO_COVERALLS_URL === "string").toEqual(true);

  expect(Boolean(process.env.REPO_COVERALLS_URL.trim())).toEqual(true);

  expect(/^https:\/\//.test(process.env.REPO_COVERALLS_URL)).toEqual(true);

  done();
});

it(`lightFetch process.env.REPO_COVERALLS_URL`, (done) => {
  (async function () {
    try {
      const res = await lightFetch(process.env.REPO_COVERALLS_URL);

      // delete res.body;
      // console.log(JSON.stringify(res, null, 4));

      expect(res.status).toEqual(200);

      expect(/text\/html/.test(res?.headers?.[`content-type`])).toEqual(true);

      done();
    } catch (e) {
      done(`shouldn't happen`);
    }
  })();
});

it(`lightFetch - json-valid`, (done) => {
  (async function () {
    try {
      const res = await fetch(`/json-valid`);

      cleanHeaders(res);

      expect(res).toEqual({
        status: 200,
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
        body: '{"ok":true}',
      });

      done();
    } catch (e) {
      done(`test error: ${e}`);
    }
  })();
});

it(`lightFetch - json-valid - decode`, (done) => {
  (async function () {
    try {
      const res = await fetch(`/json-valid`, {
        decodeJson: true,
      });

      cleanHeaders(res);

      expect(res).toEqual({
        status: 200,
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
        body: { ok: true },
      });

      done();
    } catch (e) {
      done(`test error: ${e}`);
    }
  })();
});

it(`lightFetch - json/invalid/with/header - decode`, (done) => {
  (async function () {
    try {
      await fetch(`/json/invalid/with/header`, {
        decodeJson: true,
      });

      done(`test error: should reject`);
    } catch (e) {
      expect(String(e).includes("JSON.parse(response body) error: SyntaxError: Unexpected end of JSON input")).toEqual(
        true,
      );

      done();
    }
  })();
});

it(`lightFetch - pass json`, (done) => {
  (async function () {
    try {
      const res = await fetch(`/pass`, {
        method: "post",
        body: {
          json: "data",
        },
        decodeJson: true,
      });

      cleanHeaders(res);

      expect(res).toEqual({
        status: 200,
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
        body: {
          pass: true,
          json: {
            json: "data",
          },
          query: {},
        },
      });

      done();
    } catch (e) {
      done(`test error: ${e}`);
    }
  })();
});

it(`lightFetch - pass json cyclical object`, (done) => {
  (async function () {
    try {
      const data = {};
      data.data = data;

      await fetch(`/pass`, {
        method: "post",
        body: data,
        decodeJson: true,
      });

      done(`test error: should reject`);
    } catch (e) {
      expect(String(e).includes("Converting circular structure")).toEqual(true);

      done();
    }
  })();
});

it(`lightFetch - fail through promiseResolvingStatusCodes`, (done) => {
  (async function () {
    try {
      await fetch(`/json-valid`, {
        promiseResolvingStatusCodes: (res) => {
          return res.statusCode !== 200;
        },
      });

      done(`test error: should reject`);
    } catch (e) {
      expect(String(e).includes("Not resolving response status code")).toEqual(true);

      done();
    }
  })();
});

it(`lightFetch - promiseResolvingStatusCodes throw`, (done) => {
  (async function () {
    try {
      await fetch(`/timeout`, {
        promiseResolvingStatusCodes: async (res) => {
          throw new Error(`promiseResolvingStatusCodes throw`);
        },
      });

      done(`test error: should reject`);
    } catch (e) {
      expect(String(e).includes("lib.request end method error: Error: promiseResolvingStatusCodes throw")).toEqual(
        true,
      );

      done();
    }
  })();
});

it(`lightFetch - timeout`, (done) => {
  (async function () {
    try {
      await fetch(`/timeout`, {
        method: "post",
        body: {
          delay: 40,
        },
        timeout: 30,
      });

      done(`test error: should reject`);
    } catch (e) {
      expect(String(e).includes("timeout (30ms)")).toEqual(true);

      done();
    }
  })();
});

it(`lightFetch - crash`, (done) => {
  (async function () {
    try {
      await fetchCrush(`/crash`);

      done(`test error: should reject`);
    } catch (e) {
      expect(String(e).includes("socket hang up")).toEqual(true);

      done();
    }
  })();
});

it(`lightFetch - noBody`, (done) => {
  (async function () {
    try {
      const res = await fetch("/pass", {
        method: "post",
        body: {
          some: "data",
        },
        noBody: true,
      });

      cleanHeaders(res);

      expect(res).toEqual({
        status: 200,
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
      });

      done();
    } catch (e) {
      done(`test error: shouldn't reject: ${e}`);
    }
  })();
});

it(`lightFetch - error not url`, (done) => {
  (async function () {
    try {
      await fetch("path should start with slash");

      done(`test error: should reject`);
    } catch (e) {
      expect(String(e).includes("Invalid URL")).toEqual(true);

      done();
    }
  })();
});

/**
 * Some edge cases coverage tests
 */
it(`lightFetch - not valid parameter`, (done) => {
  (async function () {
    try {
      await fetch("/xxx", {
        notvalidparam: true,
      });

      done(`test error: should reject`);
    } catch (e) {
      expect(String(e).includes(`key 'notvalidparam' is not on the list of allowed parameters method`)).toEqual(true);

      done();
    }
  })();
});

it(`lightFetch - debugRequest param is not a string`, (done) => {
  (async function () {
    try {
      await fetch("/pass", {
        debugRequest: true,
      });

      done(`test error: should reject`);
    } catch (e) {
      expect(String(e).includes(`debugRequest is not a string`)).toEqual(true);

      done();
    }
  })();
});

it(`lightFetch - method param is not a string`, (done) => {
  (async function () {
    try {
      await fetch("/pass", {
        method: true,
      });

      done(`test error: should reject`);
    } catch (e) {
      expect(String(e).includes(`method is not a string`)).toEqual(true);

      done();
    }
  })();
});

it(`lightFetch - method GET but still body provided`, (done) => {
  (async function () {
    try {
      await fetch("/pass", {
        body: {
          data: true,
        },
      });

      done(`test error: should reject`);
    } catch (e) {
      expect(
        String(e).includes(`since you have specified the body for request probably method shouldn't be GET`),
      ).toEqual(true);

      done();
    }
  })();
});

it(`lightFetch - debugRequest = reqb`, (done) => {
  (async function () {
    try {
      await fetch("/pass", {
        debugRequest: "reqb",
      });

      done();
    } catch (e) {
      done(`test error: shouldn't reject: ${e}`);
    }
  })();
});

it(`lightFetch - opt is not an object`, (done) => {
  (async function () {
    try {
      await fetch("/pass", false);

      done();
    } catch (e) {
      done(`test error: shouldn't reject: ${e}`);
    }
  })();
});

it(`lightFetch - url with get params`, (done) => {
  (async function () {
    try {
      const res = await fetch("/pass?get=param&test=true", {
        query: {
          a: "b",
          c: "d",
        },
        qsOptions: {
          encodeValuesOnly: true, // https://github.com/ljharb/qs#stringifying
        },
        debugRequest: "all",
        decodeJson: true,
        jsonSpace: 2,
      });

      cleanHeaders(res);

      expect(res).toEqual({
        status: 200,
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
        body: {
          pass: true,
          json: {},
          query: {
            a: "b",
            c: "d",
            get: ["param"],
            test: ["true"],
          },
        },
      });

      done();
    } catch (e) {
      done(`test error: shouldn't reject: ${e}`);
    }
  })();
});

it(`lightFetch - decodeJson = true, valid json`, (done) => {
  (async function () {
    try {
      const res = await fetch("/json/valid/with/no/header", {
        decodeJson: true,
      });

      cleanHeaders(res);

      expect(res).toEqual({
        status: 200,
        headers: {},
        body: {
          no: "header",
        },
      });

      done();
    } catch (e) {
      done(`test error: shouldn't reject: ${e}`);
    }
  })();
});

it(`lightFetch - decodeJson = 'header', valid json`, (done) => {
  (async function () {
    try {
      const res = await fetch("/json/valid/with/no/header", {
        decodeJson: "header",
      });

      cleanHeaders(res);

      expect(res).toEqual({
        status: 200,
        headers: {},
        body: '{"no":"header"}',
      });

      done();
    } catch (e) {
      done(`test error: shouldn't reject: ${e}`);
    }
  })();
});

it(`lightFetch - decodeJson = true, invalid json`, (done) => {
  (async function () {
    try {
      await fetch("/json/invalid/with/no/header", {
        decodeJson: true,
      });

      done(`test error: should reject`);
    } catch (e) {
      expect(String(e).includes(`SyntaxError: Unexpected end of JSON input`)).toEqual(true);

      done();
    }
  })();
});

it(`lightFetch - decodeJson = 'header', invalid json`, (done) => {
  (async function () {
    try {
      const res = await fetch("/json/invalid/with/no/header", {
        decodeJson: "header",
      });

      cleanHeaders(res);

      expect(res).toEqual({
        status: 200,
        headers: {},
        body: '{"ok":true',
      });

      done();
    } catch (e) {
      done(`test error: shouldn't reject: ${e}`);
    }
  })();
});
