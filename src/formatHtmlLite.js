const trim = require("./trim");

const thFactory = (mod) => (msg) => new Error(`formatHtmlLite.${mod} error: ${msg}`);

const types = {
  opening: "opening",
  closing: "closing",
  selfclosing: "selfclosing",
  data: "data",
};

/**
 * https://regex101.com/r/kxfLw0/1
 *
 * WARNING 1:
 * this will not match attributes like
 * abc=value
 * it will thoug match all
 * abc="value"
 * or
 * abc='value'
 *
 * WARNING 2:
 * it will not match properly also attributes
 * abc="vale\"rest"
 * nor
 * abc='vale\'rest'
 *
 * It would be possible to cover 2 warnings above in perl regex
 * but it is not possible in javascript
 */
const attrReg = /(\S+)\s*=\s*["']([^=]+)["'](\s+|$)/gi;

function processAttributes(attr) {
  const th = thFactory("processAttributes");

  if (typeof attr !== "string") {
    throw th(`attr parameter is not a string`);
  }

  return [...attr.matchAll(attrReg)].map(([_, key, value]) => [key, value]);
}

function iterate(html, event) {
  const th = thFactory("iterate");

  if (typeof html !== "string") {
    throw th(`html parameter is not a string`);
  }

  if (typeof event !== "function") {
    throw th(`event parameter is not a function`);
  }

  const list = html.split("");

  let buff = "";

  let inTag = false;

  let t;
  for (let i = 0, l = list.length; i < l; i += 1) {
    t = list[i];

    if (t === ">") {
      inTag = false;

      buff += t;

      if (buff.at(-2) === "/") {
        event(types.selfclosing, buff);
        buff = "";

        continue;
      }

      if (buff.at(1) === "/") {
        event(types.closing, buff);
        buff = "";

        continue;
      }

      event(types.opening, buff);
      buff = "";

      continue;
    }

    if (inTag) {
      buff += t;

      continue;
    }

    if (t === "<") {
      if (buff !== "") {
        event(types.data, buff);
        buff = "";
      }

      inTag = true;

      buff += t;

      continue;
    }

    buff += t;
  }

  if (buff !== "") {
    event("data", buff);
    buff = "";
  }
}

function iterateDetailed(html, event) {
  const th = thFactory("iterateDetailed");

  if (typeof html !== "string") {
    throw th(`html parameter is not a string`);
  }

  if (typeof event !== "function") {
    throw th(`event parameter is not a function`);
  }

  iterate(html, (type, data) => {
    switch (type) {
      case types.opening: {
        const raw = trim(data, `<>/ \n\t`);

        const [tag, ...rest] = raw.split(" ");

        const attr = processAttributes(rest.join(" "));

        event(type, data, {
          tag: trim(tag, `<>/ \n\t`),
          attr,
        });

        break;
      }
      case types.closing:
      case types.selfclosing: {
        event(type, data, {
          tag: trim(data, `<>/ \n\t`),
        });

        break;
      }
      default: {
        event(type, data, {});

        break;
      }
    }
  });
}

function iterateDetailedLevels(html, event, noTrimTags) {
  const th = thFactory("iterateDetailedLevels");

  if (typeof html !== "string") {
    throw th(`html parameter is not a string`);
  }

  if (typeof event !== "function") {
    throw th(`event parameter is not a function`);
  }

  if (!Array.isArray(noTrimTags)) {
    noTrimTags = [];
  }

  let stack = [];

  let add = false;

  let ignoreUntilTag = false;

  let buff = "";

  iterateDetailed(html, (type, data, meta) => {
    let ignoreOnce = false;

    const { tag } = meta;

    if (add) {
      stack.push(add);

      add = false;
    }

    if (type === types.opening) {
      if (ignoreUntilTag) {
        buff += data;

        return;
      } else {
        add = tag;

        if (noTrimTags.find((t) => tag === t)) {
          ignoreUntilTag = tag;

          ignoreOnce = true;
        }
      }
    }

    if (type === types.closing) {
      if (ignoreUntilTag) {
        if (tag === ignoreUntilTag) {
          ignoreUntilTag = false;

          event(type, buff, {}, [...stack]);

          stack.pop();
        } else {
          buff += data;

          return;
        }
      } else {
        const last = stack.pop();

        if (last !== tag) {
          throw th(`closing wrong tag should be >${last}< but closing >${tag}< - probably closing tag was missing`);
        }
      }
    }

    if (!ignoreOnce && ignoreUntilTag) {
      buff += data;

      return;
    }

    event(type, data, meta, [...stack]);
  });
}

const th = (msg) => new Error(`formatHtmlLite error: ${msg}`);

const tool = function formatHtmlLite(html, opt) {
  if (typeof html !== "string") {
    throw th(`html parameter is not a string`);
  }

  const { noTrimTags, spaces } = {
    noTrimTags: ["script", "pre", "textarea"],
    spaces: 4,
    ...opt,
  };

  if (!Array.isArray(noTrimTags)) {
    throw th(`noTrimTags is not an array`);
  }

  if (!/^\d+$/.test(spaces)) {
    throw th(`spaces is not a number`);
  }

  const space = " ".repeat(spaces);

  const list = [];

  let dontProcessOneAfter = false;

  iterateDetailedLevels(
    html,
    (type, data, meta, stack) => {
      if (dontProcessOneAfter) {
        dontProcessOneAfter = false;

        list.push(data);
        return;
      }

      if (noTrimTags.filter((tag) => stack.includes(tag)).length > 0) {
        // intersection of two arrays
        list.push(data);

        dontProcessOneAfter = true;

        return;
      }

      const prefix = (list.length === 0 ? "" : "\n") + space.repeat(stack.length);

      list.push(prefix + trim(data));
    },
    noTrimTags,
  );

  return list.join("");
};

tool.types = types;
tool.processAttributes = processAttributes;

tool.iterate = iterate;
tool.iterateDetailed = iterateDetailed;
tool.iterateDetailedLevels = iterateDetailedLevels;

module.exports = tool;
