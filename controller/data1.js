const cache = require(`../test/public/cache`);

const now = () => new Date().toISOString().substring(0, 19).replace("T", " ");

const create = () => {
  console.log(now() + `----create1----`);
  return Promise.resolve("testdatafrompromise 1");
};

const controller = (req, res, query = {}, json = {}) => {
  cache("test", create).then((data) => {
    res.setHeader(`Content-Type`, `application/json; charset=utf-8`);

    if (cache.lastInfo() === "from cache") {
      res.statusCode = 304;
    }

    res.end(
      JSON.stringify(
        {
          page: {
            query,
            json,
          },
          node: process.version,
          cache: data,
          source: cache.lastInfo(),
          inspect: cache.inspect(),
        },
        null,
        4,
      ),
    );
  });
};

controller.url = `/data1`;

module.exports = controller;
