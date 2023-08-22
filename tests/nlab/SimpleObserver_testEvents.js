const SimpleObserver = require("../../SimpleObserver");

const delay = require("../../delay");

module.exports = {
  first: async () => {
    const test = {};

    SimpleObserver.addEventListener("test", (data) => {
      test.one = data;
    });

    SimpleObserver.addEventListener("test", (data) => {
      test.two = data;
    });

    await delay(5);

    SimpleObserver.dispatchEvent("test", "data");

    return test;
  },
  two: async () => {
    const test = {};

    SimpleObserver.addEventListener("test", (data) => {
      test.one = data;
    });

    SimpleObserver.addEventListener("test2", (data) => {
      test.two = data;
    });

    await delay(5);

    SimpleObserver.dispatchEvent("test", "data");

    return test;
  },
  three: async () => {
    const test = {};

    let i = 0;
    const event = (data) => {
      test.event = data;
      test[`i${i}`] = i++;
    };

    SimpleObserver.addEventListener("test", event);

    SimpleObserver.addEventListener("test", event);

    await delay(5);

    SimpleObserver.dispatchEvent("test", "data");

    return test;
  },
  four: async () => {
    const test = {};

    await delay(5);

    SimpleObserver.dispatchEvent("test", "data");

    return test;
  },
  five: async () => {
    const test = {};

    let i = 0;
    const event = (data) => {
      test.event = data;
      test[`i${i}`] = i++;
    };

    let k = 0;
    const event2 = (data) => {
      test.event2 = data;
      test[`k${k}`] = k++;
    };

    SimpleObserver.addEventListener("test", event);

    SimpleObserver.addEventListener("test", event2);

    SimpleObserver.addEventListener("test", event2);

    SimpleObserver.addEventListener("test", event);

    await delay(5);

    SimpleObserver.dispatchEvent("test", "data");

    return test;
  },
  six: async () => {
    const test = {};

    let i = 0;
    const event = (data) => {
      test.event = data;
      test[`i${i}`] = i++;
    };

    let k = 0;
    const event2 = (data) => {
      test.event2 = data;
      test[`k${k}`] = k++;
    };

    SimpleObserver.addEventListener("test", event);

    SimpleObserver.addEventListener("test", event2);

    SimpleObserver.addEventListener("test", event2);

    SimpleObserver.addEventListener("test", event);

    SimpleObserver.removeEventListener("test", event2);

    await delay(5);

    SimpleObserver.dispatchEvent("test", "data");

    return test;
  },
  eight: async () => {
    const test = {};

    let i = 0;
    const event = (data) => {
      test[`event-${i}-${data}`] = i++;
    };

    let k = 0;
    const event2 = (data) => {
      test[`event2-${k}-${data}`] = k++;
    };

    SimpleObserver.addEventListener("test", event);

    SimpleObserver.addEventListener("test", event2);

    SimpleObserver.addEventListener("test", event);

    SimpleObserver.addEventListener("test", event2, true);

    await delay(5);

    SimpleObserver.dispatchEvent("test", "data1");

    SimpleObserver.dispatchEvent("test", "data2");

    return test;
  },
  nine: async () => {
    const test = {};

    let i = 0;
    const event = (data) => {
      test[`event-${i}-${data}`] = i++;
    };

    let k = 0;
    const event2 = (data) => {
      test[`event2-${k}-${data}`] = k++;
    };

    SimpleObserver.addEventListener("test", event);

    SimpleObserver.addEventListener("test", event2);

    SimpleObserver.addEventListener("test", event);

    SimpleObserver.addEventListener("test", event2, true);

    SimpleObserver.removeEventListenerAll("test");

    await delay(5);

    SimpleObserver.dispatchEvent("test", "data1");

    SimpleObserver.dispatchEvent("test", "data2");

    return test;
  },
};
