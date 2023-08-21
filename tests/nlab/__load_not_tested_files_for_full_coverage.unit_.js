/**
 * to solve issue: https://github.com/facebook/jest/issues/1211
 */

const fs = require("fs");

const path = require("path");

const glob = require("glob");

const root = path.resolve(__dirname, "..", "..");

const log = console.log;

async function exctractCollectCoverageFrom() {
  const jest_config_js = path.resolve(root, "jest.config.js");

  if (!fs.existsSync(jest_config_js)) {
    throw new Error(`file >${jest_config_js}< doesn't exist`);
  }

  let configModule;

  try {
    configModule = require(jest_config_js);
  } catch (e) {
    throw new Error(`loading file >${jest_config_js}< as a module with require() failed, error: ${e}`);
  }

  let config;

  try {
    config = await configModule();
  } catch (e) {
    throw new Error(`executing imported function from module >${jest_config_js}< failed, error: ${e}`);
  }

  let collectCoverageFrom;

  if (!Array.isArray(config.collectCoverageFrom)) {
    throw new Error(`collectCoverageFrom not defined in config >${jest_config_js}<`);
  }

  if (config.collectCoverageFrom.length < 1) {
    throw new Error(`collectCoverageFrom in config >${jest_config_js}< is an empty array`);
  }

  collectCoverageFrom = config.collectCoverageFrom[0];

  return collectCoverageFrom;
}

const requireAllJestcollectCoverageFrom = async function () {
  try {
    const collectCoverageFrom = await exctractCollectCoverageFrom();

    const globPath = path.join(root, collectCoverageFrom);

    const list = await new Promise((resolve, reject) => {
      glob(globPath, {}, function (e, files) {
        if (e) {
          return reject(e);
        }

        return resolve(files);
      });
    });

    log({
      globPath,
      list,
    });

    list.forEach((file) => require(file));
  } catch (e) {
    log({
      global_main_catch: e,
    });

    throw e;
  }
};

if (require.main === module) {
  requireAllJestcollectCoverageFrom();
} else {
  it(`load not tested files for full coverage`, (done) => {
    (async function () {
      try {
        await requireAllJestcollectCoverageFrom();

        expect(true).toEqual(true);

        done();
      } catch (e) {
        log({
          requireAllJestcollectCoverageFrom_error: e,
        });

        throw e;
      }
    })();
  });
}
