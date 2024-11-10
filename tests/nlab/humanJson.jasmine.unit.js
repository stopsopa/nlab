const humanJson = require("nlab/humanJson.js");

/**
 * https://passwordsgenerator.net/sha256-hash-generator/
 */
describe("humanJson", () => {
  it(`null`, (done) => {
    const result = humanJson(null);

    const expected = "null";

    expect(result).toEqual(expected);

    done();
  });
  it(`boolean`, (done) => {
    const result = humanJson(true);

    const expected = "true";

    expect(result).toEqual(expected);

    done();
  });
  it(`number`, (done) => {
    const result = humanJson(6);

    const expected = "6";

    expect(result).toEqual(expected);

    done();
  });

  it(`string`, (done) => {
    const result = humanJson("string");

    const expected = '"string"';

    expect(result).toEqual(expected);

    done();
  });

  it(`array`, (done) => {
    const result = humanJson([]);

    const expected = "[]";

    expect(result).toEqual(expected);

    done();
  });

  it(`object`, (done) => {
    const result = humanJson({});

    const expected = "{}";

    expect(result).toEqual(expected);

    done();
  });

  it(`complex object`, (done) => {
    const result = humanJson(
      {
        abc: {
          cde: {
            key: "value",
            nested: {
              aa: "bb",
              bb: "cc",
            },
          },
          efg: [{ eee: "uuu" }, { ttt: { zzz: "bbb" } }],
        },
      },
      null,
      4,
    );

    const expected = `{
    "abc":{
        "cde":{
            "key":"value",
            "nested":{"aa": "bb","bb": "cc"}
        },
        "efg":[
            {"eee": "uuu"},
            {
                "ttt":{"zzz": "bbb"}
            }
        ]
    }
}`;

    // console.log(humanJson(result, null, 4));

    expect(result).toEqual(expected);

    done();
  });
});
