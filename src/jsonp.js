var jsonp = (function (d, w, namespaces) {
  w[namespaces] || (w[namespaces] = {});

  function getcallname() {
    var m = "_" + 1 * new Date();
    return {
      fn: m,
      name: namespaces + "." + m,
    };
  }
  function isObject(o) {
    return Object.prototype.toString.call(o) === "[object Object]";
  }
  function each(obj, fn, context) {
    if (Array.isArray(obj)) {
      for (var i = 0, l = obj.length; i < l; ++i) fn.call(context, obj[i], i);
    } else if (isObject(obj)) {
      for (var i in obj) fn.call(context, obj[i], i);
    }
  }
  function serialize(data) {
    if (isObject(data)) {
      var d = [];
      each(data, function (val, key) {
        d.push(encodeURIComponent(key) + "=" + encodeURIComponent(val));
      });
      return d.join("&");
    }
    return "";
  }
  return function jsonp(url, data, callbackparamname = "callback") {
    return new Promise((reqsolve, reject) => {
      data = { ...data };
      var a = d.createElement("script"),
        h = d.getElementsByTagName("script")[0],
        t = getcallname();
      a.async = 1;
      w[namespaces][t.fn] = function (obj) {
        // clean up namepsace
        delete w[namespaces][t.fn];
        a.parentNode.removeChild(a);

        reqsolve(obj);
      };
      data[callbackparamname] = t.name;
      data = serialize(data);
      data.length > 1 && (url += (url.indexOf("?") > -1 ? "&" : "?") + data);
      a.src = url;
      h.parentNode.insertBefore(a, h);
    });
  };
})(document, window, "jsonpcallbacknamespaces");

module.exports = jsonp;
