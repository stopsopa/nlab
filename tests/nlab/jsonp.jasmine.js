import jsonp from "../../src/jsonp.js";

import isNode from "../../src/isNode.js";

if (!isNode && typeof window !== "undefined" && window.testServer) {
  describe("jsonp", () => {
    it("regular", async () => {
      const data = await jsonp("/jsonp", {
        some: "data",
      });

      const { callback, ...rest } = data;

      const c = callback.substring(0, 25);

      expect({
        ...rest,
        callback: c,
      }).toEqual({ some: "data", ok: true, callback: "jsonpcallbacknamespaces._" });
    });
  });
}
