const buildCurl = (function () {
  const th = (msg) => new Error(`buildCurl error: ${msg}`);

  function isObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  }

  function substituteEmail(body) {
    if (isObject(body)) {
      if (typeof body?.shopperInfo?.email === "string") {
        body.shopperInfo.email = email;
      }
    }
    return body;
  }

  return function (opt) {
    let { url, method, headers, body, json, multiline } = {
      json: true,
      multiline: false,
      ...opt,
    };

    if (typeof url !== "string" || !url.trim()) {
      throw th(`url is not a string - not defined`);
    }

    if (!isObject(headers)) {
      throw th(
        `headers field from db after json parsing doesn't seem to be an object`
      );
    }

    body = substituteEmail(body);

    const join = [];

    if (typeof method === "string" && method.trim()) {
      method = `-X${method}`;
    } else {
      method = "";
    }

    join.push(method);

    if (Object.keys(headers).length > 0) {
      for (const [key, value] of Object.entries(headers)) {
        if (
          typeof key === "string" &&
          key.trim() &&
          typeof value === "string" &&
          value.trim()
        ) {
          join.push(`-H "${key}: ${slashParenthesis(value)}"`);
        }
      }
    }

    if (isObject(body)) {
      join.push(`-d '${JSON.stringify(body, null, 4)}'`);
    }

    join.push(url);

    const delimiter = multiline ? ` \\\n` : ` `;

    return `curl${delimiter}${join.join(delimiter)}`;
  };
})();

module.exports = buildCurl;
