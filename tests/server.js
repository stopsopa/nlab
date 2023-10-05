const express = require("express");

require("dotenv-up")(2, true, "server.js");

const delay = require("../delay");

const log = (function () {
  try {
    return console.log;
  } catch (e) {
    return function () {};
  }
})();

if (typeof process.argv[2] !== "string") {
  throw new Error(`port not specified - specify it as a first argument`);
}

const host = process.env.NODE_API_HOST;

const port = process.env[process.argv[2]];

if (!/^\d+$/.test(port)) {
  throw new Error(`port invalid >${port}<`);
}

if (typeof host !== "string" || !host.trim()) {
  throw new Error(`host invalid >${host}<`);
}

if (!/^\d+$/.test(port)) {
  throw new Error(`can't find port in env vars specified in first argument (${process.argv[2]})`);
}

const app = express();

app.disable("x-powered-by");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`url: ${req.url}`);

  next();
});

app.all("/", (req, res) => {
  res.redirect("/app");
});

app.all("/app", (req, res) => {
  res.end("all good");
});

/**
 * fetch('/json-valid').then(r => r.json()).then(d => console.log("d: ", d))
 */
app.all("/json-valid", (req, res) => {
  res.json({
    ok: true,
  });
});

app.all("/pass", (req, res) => {
  res.json({
    pass: true,
    json: req.body,
    query: req.query,
  });
});

app.all("/timeout", async (req, res) => {
  await delay(req.body.delay);

  res.json({
    timeout: req.body.delay || "undefined",
  });
});

app.all("/crash", () => {
  process.exit(1);
});

/**
 * fetch('/json/invalid/with/header').then(r => r.json()).then(d => console.log("d: ", d))
 */
app.all("/json/invalid/with/header", (req, res) => {
  res.set("Content-type", "application/json; charset=utf-8");

  res.end(JSON.stringify({ ok: true }).slice(0, -1));
});

app.all("/json/valid/with/no/header", (req, res) => {
  res.end(
    JSON.stringify({
      no: "header",
    }),
  );
});

app.all("/json/invalid/with/no/header", (req, res) => {
  res.end(JSON.stringify({ ok: true }).slice(0, -1));
});

app.listen(port, host, () => {
  console.log(`\n 🌎  Server is running ` + `http://${host}:${port}\n`);
});

const char = process.argv[2] === "NODE_API_PORT" ? "x" : "+";

setInterval(() => {
  process.stdout.write(char);
}, 1000);
