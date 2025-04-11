function add(a, b) {
  return a + b;
}

describe("jsonp", () => {
  it("should add 1 + 2 = 3", async () => {
    expect(add(1, 2)).toEqual(3);
  });
});
