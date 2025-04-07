const { spawn } = require("child_process");
// import { spawn } from "child_process";

const se = require("./serializeError");
// import se from "nlab/se";

const th = (msg) => new Error(`cmd.js error: ${msg}`);

/**
 * Running:
 *
 const data = await cmd([
 'ls',
 '-la',
 '/Users/sd/Workspace/projects/monorepo/monorepo-master/a b c/test'
 ]);
 will work for directory with spacec in name
 */

module.exports = function cmd(cmd, options = {}) {
  return new Promise((resolve, reject) => {
    if (typeof cmd === "string") {
      cmd = cmd.trim();

      if (!cmd) {
        throw th(`cmd is an empty string`);
      }

      cmd = cmd.split(/\s+/);
    }

    if (!Array.isArray(cmd)) {
      throw th(`cmd is not an array`);
    }

    if (!cmd.length) {
      throw th(`cmd is an empty array`);
    }

    const { verbose = false } = { ...options };

    verbose && console.log(`executing command ${cmd.join(" ")}`);

    const [command, ...args_] = cmd;

    const process = spawn(command, args_, options);

    let stdout = "";

    let stderr = "";

    process.stdout.on("data", (data) => {
      stdout += String(data);
    });

    process.stderr.on("data", (data) => {
      stderr += String(data);
    });

    process.on("error", (e) => {
      verbose && console.log(`error: ${e.message}`);

      reject({
        cmd,
        stdout,
        stderr,
        e: se(e),
      });
    });

    process.on("close", (code) => {
      verbose && console.log(`child process ${cmd.join(" ")} exited with code ${code}`);

      if (code !== 0) {
        return reject({
          cmd,
          stdout,
          stderr,
          code,
        });
      }

      resolve({
        cmd,
        stdout,
        stderr,
        code,
      });
    });
  });
};
