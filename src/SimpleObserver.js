const th = (msg) => new Error(`SimpleObserver error: ${msg}`);

const events = {};

const SimpleObserver = {
  addEventListener: (name, event, once) => {
    if (typeof name !== "string" || !name.trim()) {
      throw th(`addEventListener name is not a string`);
    }

    if (typeof event !== "function") {
      throw th(`addEventListener event is not a function`);
    }

    if (!events[name]) {
      events[name] = [];
    }

    events[name].push({
      once: Boolean(once),
      event,
    });

    return SimpleObserver;
  },
  removeEventListener: (name, event) => {
    if (typeof name !== "string" || !name.trim()) {
      throw th(`removeEventListener name is not a string`);
    }

    if (typeof event !== "function") {
      throw th(`removeEventListener event is not a function`);
    }

    if (!events[name]) {
      return SimpleObserver;
    }

    events[name] = events[name].filter((e) => e.event !== event);

    if (events[name].length === 0) {
      delete events[name];
    }

    return SimpleObserver;
  },
  removeEventListenerAll: (name) => {
    if (typeof name !== "string" || !name.trim()) {
      throw th(`removeEventListenerAll name is not a string`);
    }

    delete events[name];

    return SimpleObserver;
  },
  dispatchEvent: (name, data) => {
    if (typeof name !== "string" || !name.trim()) {
      throw th(`dispatchEvent name is not a string`);
    }

    if (!events[name]) {
      return SimpleObserver;
    }

    const once = [];

    for (let event of events[name]) {
      event.event(data);

      if (event.once) {
        once.push(event.event);
      }
    }

    if (once.length > 0) {
      for (let event of once) {
        SimpleObserver.removeEventListener(name, event);
      }
    }

    return SimpleObserver;
  },
};

module.exports = SimpleObserver
