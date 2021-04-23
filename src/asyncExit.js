
function now() {
  return (new Date()).toISOString().substring(0, 19).replace('T', ' ');
}

const exit = (function (e) {
  return code => e(code);
}(process.exit));

let used = false;

module.exports = async (promise, options) => {

  if (used) {

    throw new Error(`${__filename} ${now()} event already registered`);
  }

  used = true;

  let {
    resume,
    exitCodeNormal,
    exitCodeTimeout,
    promiseTimeoutMsec,
    verbose,
    bindTo,
  } = Object.assign({}, {
    resume              : true,
    // https://nodejs.org/api/process.html#process_signal_events
    bindTo              : ['exit', 'SIGINT', 'SIGTERM', 'SIGHUP', 'SIGBREAK', 'SIGUSR1', 'SIGUSR2', 'uncaughtException'],

    exitCodeNormal      : 0,
    exitCodeTimeout     : 1,
    promiseTimeoutMsec  : 30000,
    verbose             : true,
    errors              : true,
  }, options);

  let stop = false;

  async function onExit(origin, exitCodeManual) {

    if (stop) {

      return;
    }

    stop = true;

    verbose && console.log(`${__filename} ${now()} start origin: ${origin}`);

    onExit = () => {};

    let timeoutHandler;

    if (Number.isInteger(promiseTimeoutMsec)) {

      timeoutHandler = setTimeout(() => {

        errors && console.error(`${__filename} ${now()} promiseTimeoutMsec(${promiseTimeoutMsec})`);

        exit(exitCodeTimeout);

      }, promiseTimeoutMsec);
    }

    if (resume) {

// https://stackoverflow.com/a/14032965/5560682
// https://nodejs.org/api/process.html#process_signal_events
      process.stdin.resume(); //so the program will not close instantly
    }

    try {

      exitCodeNormal = parseInt(await promise(origin), 10);
    }
    catch (e) {

      errors && console.error(`${__filename} ${now()} error: ${e}`);
    }

    clearTimeout(timeoutHandler);

    verbose && console.log(`${__filename} ${now()} stop origin: ${origin}`);

    exit(Number.isInteger(exitCodeManual) ? exitCodeManual : exitCodeNormal);
  }

  process.exit = code => onExit('manual', code);

  // // do something when app is closing
  // process.on('exit', onExit.bind(null,'exit'));
  //
  // // catches ctrl+c event
  // process.on('SIGINT', onExit.bind(null, 'SIGINT'));
  //
  // // catches "kill pid" (for example: nodemon restart)
  // process.on('SIGUSR1', onExit.bind(null, 'SIGUSR1'));
  // process.on('SIGUSR2', onExit.bind(null, 'SIGUSR2'));
  //
  // // catches uncaught exceptions
  // process.on('uncaughtException', onExit.bind(null, 'uncaughtException'));

  bindTo.forEach(event => {

    // console.log(`bind ${event}`)

    process.on(event, onExit.bind(null, event))
  });
}