// const cmd from 'nlab/cmd';

const cmd = require("../../src/cmd");

const se = require("../../src/serializeError");

function clean(data) {
  return data;
}

describe("cmd", () => {
  it("stdout", async () => {
    const env = { ...process.env };

    env.NODE_OPTIONS = "";

    const data = await cmd(["node", "tests/nlab/cmdcli.js", "--test1"], {
      env,
    });

    // console.log("data", JSON.stringify(data, null, 2));

    expect(data).toEqual({
      cmd: ["node", "tests/nlab/cmdcli.js", "--test1"],
      stdout: "hhhhhhhhh\n",
      stderr: "",
      code: 0,
    });
  });

  it("stderr", (done) => {
    (async function () {
      try {
        const env = { ...process.env };

        env.NODE_OPTIONS = "";

        await cmd(["node", "tests/nlab/cmdcli.js", "--exit1"], {
          env,
        });

        done(`Shouldn't happen`);
      } catch (e) {
        const err = se(e);

        // console.log("data", JSON.stringify(err, null, 2));

        expect(err).toEqual({
          cmd: ["node", "tests/nlab/cmdcli.js", "--exit1"],
          stdout: "aaaaaaaaa\n",
          stderr: "bbbbbbbbb\n",
          code: 1,
        });

        done();
      }
    })();
  });

  it("timeout", (done) => {
    (async function () {
      try {
        const env = { ...process.env };

        env.NODE_OPTIONS = "";

        await cmd(["node", "tests/nlab/cmdcli.js", "--timeout"], {
          env,
          timeout: 200,
        });

        done(`Shouldn't happen`);
      } catch (e) {
        const err = se(e);

        // console.log("data", JSON.stringify(err, null, 2));

        expect(err).toEqual({
          cmd: ["node", "tests/nlab/cmdcli.js", "--timeout"],
          stdout: "cccccccccc\nSIGTERM\n",
          stderr: "ddddddddd\n",
          code: 143,
        });

        done();
      }
    })();
  });

  it("error", (done) => {
    (async function () {
      try {
        const env = { ...process.env };

        env.NODE_OPTIONS = "";

        await cmd(["non_existing_program"], {
          env,
          timeout: 200,
          verbose: true,
        });

        done(`Shouldn't happen`);
      } catch (e) {
        const err = se(e);

        delete err.e.stack;

        // console.log("data", JSON.stringify(err, null, 2));

        expect(err).toEqual({
          cmd: ["non_existing_program"],
          stdout: "",
          stderr: "",
          e: {
            errno: -2,
            code: "ENOENT",
            syscall: "spawn non_existing_program",
            path: "non_existing_program",
            spawnargs: [],
            name: "Error",
            message: "spawn non_existing_program ENOENT",
          },
        });

        done();
      }
    })();
  });

  it("stdout from string", async () => {
    const env = { ...process.env };

    env.NODE_OPTIONS = "";

    const data = await cmd("node tests/nlab/cmdcli.js --test1", {
      env,
    });

    // console.log("data", JSON.stringify(data, null, 2));

    expect(data).toEqual({
      cmd: ["node", "tests/nlab/cmdcli.js", "--test1"],
      stdout: "hhhhhhhhh\n",
      stderr: "",
      code: 0,
    });
  });

  it("empty string", async () => {
    try {
      const env = { ...process.env };

      env.NODE_OPTIONS = "";

      await cmd("", {
        env,
      });
    } catch (e) {
      const err = se(e);

      delete err.stack;

      //   console.log("data", JSON.stringify(err, null, 2));

      expect(err).toEqual({
        name: "Error",
        message: "cmd.js error: cmd is an empty string",
      });
    }
  });

  it("not array", async () => {
    try {
      const env = { ...process.env };

      env.NODE_OPTIONS = "";

      await cmd(
        {},
        {
          env,
        },
      );
    } catch (e) {
      const err = se(e);

      delete err.stack;

      //   console.log("data", JSON.stringify(err, null, 2));

      expect(err).toEqual({
        name: "Error",
        message: "cmd.js error: cmd is not an array",
      });
    }
  });

  it("empty array", async () => {
    try {
      const env = { ...process.env };

      env.NODE_OPTIONS = "";

      await cmd([], {
        env,
      });
    } catch (e) {
      const err = se(e);

      delete err.stack;

      //   console.log("data", JSON.stringify(err, null, 2));

      expect(err).toEqual({
        name: "Error",
        message: "cmd.js error: cmd is an empty array",
      });
    }
  });

  it("verbose", async () => {
    const env = { ...process.env };

    env.NODE_OPTIONS = "";

    const data = await cmd(["node", "tests/nlab/cmdcli.js", "--test1"], {
      env,
      verbose: true,
    });

    // console.log("data", JSON.stringify(data, null, 2));

    expect(data).toEqual({
      cmd: ["node", "tests/nlab/cmdcli.js", "--test1"],
      stdout: "hhhhhhhhh\n",
      stderr: "",
      code: 0,
    });
  });



  it("no options", (done) => {
    (async function () {
      try {
        const env = { ...process.env };

        env.NODE_OPTIONS = "";

        await cmd(["non_existing_program"]);

        done(`Shouldn't happen`);
      } catch (e) {
        const err = se(e);

        delete err.e.stack;

        // console.log("data", JSON.stringify(err, null, 2));

        expect(err).toEqual({
          cmd: ["non_existing_program"],
          stdout: "",
          stderr: "",
          e: {
            errno: -2,
            code: "ENOENT",
            syscall: "spawn non_existing_program",
            path: "non_existing_program",
            spawnargs: [],
            name: "Error",
            message: "spawn non_existing_program ENOENT",
          },
        });

        done();
      }
    })();
  });
});
