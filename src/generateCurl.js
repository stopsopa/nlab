const buildCurl = (function () {
  const th = (msg) => new Error(`buildCurl error: ${msg}`);

  function isObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  }

  function slashParenthesis(data) {
    if (data.includes('"')) {
      return data.replace(/"/g, '\\"');
    }
    return data;
  }

  return function (opt) {
    let { url, method, headers, body, multiline } = {
      multiline: false,
      ...opt,
    };

    if (typeof url !== "string" || !url.trim()) {
      throw th(`url is not a string - not defined`);
    }

    const join = [];

    if (typeof method === "string" && method.trim()) {
      method = `-X${method}`;

      join.push(method.toUpperCase());
    }

    if (headers !== undefined) {
      if (!isObject(headers)) {
        throw th(`headers if defined should be an object, but it is >${Object.prototype.toString.call(headers)}<`);
      }

      if (Object.keys(headers).length > 0) {
        for (const [key, value] of Object.entries(headers)) {
          if (typeof key === "string" && key.trim() && typeof value === "string" && value.trim()) {
            join.push(`-H "${key}: ${slashParenthesis(value)}"`);
          }
        }
      }
    }

    if (body !== undefined) {
      if (isObject(body) || Array.isArray(body)) {
        body = JSON.stringify(body, null, multiline ? 4 : 0);
      }
      if (typeof body === "string") {
        join.push(`-d '${body}'`);
      } else {
        throw th(
          `body if defined should be an object, array or string but it is >${Object.prototype.toString.call(headers)}<`
        );
      }
    }

    join.push(url);

    const delimiter = multiline ? ` \\\n` : ` `;

    return `curl${delimiter}${join.join(delimiter)}`;
  };
})();

module.exports = buildCurl;
