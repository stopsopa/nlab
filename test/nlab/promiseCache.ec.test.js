
const { start, diff } = require('./timer');

const promiseCache = require('../../promiseCache');

const log = require('inspc');

const {
    prepareToStamp,
    throttle,
    nowHR,
    now,
    Bag,
} = promiseCache;

jest.setTimeout(300);

it('prepareToStamp test', async done => {

    expect(prepareToStamp('test')).toEqual('test');

    done();
});

it('prepareToStamp [test]', async done => {

    expect(prepareToStamp(['test'])).toEqual(['test']);

    done();
});

it('prepareToStamp {test:"test"}', async done => {

    expect(prepareToStamp({test:"test"})).toEqual({test:"test"});

    done();
});

it('prepareToStamp {test:"test",te:un}', async done => {

    expect(prepareToStamp({test:"test",te: undefined})).toEqual({test:"test", te: 'undefined'});

    done();
});

it('prepareToStamp ... 1', async done => {

    expect(prepareToStamp(['a', undefined, 'b'])).toEqual(['a', undefined, 'b']);

    done();
});

it('prepareToStamp ... 2', async done => {

    expect(prepareToStamp({a: ['a', undefined, 'b'], b: undefined})).toEqual({"a": ["a", undefined, "b"], "b": "undefined"});

    done();
});

it('prepareToStamp ... 3', async done => {

    expect(prepareToStamp({a: ['a', undefined, () => {}, 'b'], b: undefined})).toEqual({"a": ["a", undefined, "() => {}", "b"], "b": "undefined"});

    done();
});

it('prepareToStamp ... 4', async done => {

    expect(prepareToStamp({
        a: () => {},
        b: async () => {},
        c: () => "",
        d: () => {return "test"},
        e: () => {return "test";},
        f: function () {},
        g: function () {return 'test'},
        h: function () {return 'test';},
        i: (a, b) => {return a+b},
        j: (a, b) => a + b,
        k: async function () {},
    })).toEqual({
        "a": "() => {}",
        "b": "async () => {}",
        "c": `() => ""`,
        "d": `() => {
      return "test";
    }`,
        "e": `() => {
      return "test";
    }`,
        "f": "function () {}",
        "g": `function () {
      return 'test';
    }`,
        "h": `function () {
      return 'test';
    }`,
        "i": `(a, b) => {
      return a + b;
    }`,
        "j": "(a, b) => a + b",
        "k": "async function () {}",
    });

    done();
});

it('prepareToStamp ... 5', async done => {

    expect(prepareToStamp(['a', new Date(1552036174656), 'b'])).toEqual(['a', "2019-03-08T09:09:34.656Z", 'b']);

    done();
});

it('nowHR', done => {

    expect(nowHR(1552036174856)).toEqual("2019-03-08 09:09:34 856");

    done();
});

it('now', done => {

    expect(now(1552036174856)).toEqual(1552036174856);

    done();
});

it('Bag throw wrong arg 1', async done => {

    try {

        new Bag(5);

    }
    catch (e) {

        expect(e.message).toEqual('cache.js:throttle(maxRequests, withinTimeMS): withinTimeMS should be positive integer, it is: undefined');

        done();
    }
});

it('Bag throw wrong arg 2', async done => {

    try {

        new Bag(5, 'd');

    }
    catch (e) {

        expect(e.message).toEqual('cache.js:throttle(maxRequests, withinTimeMS): withinTimeMS should be positive integer, it is: "d"');

        done();
    }
});

it('Bag throw wrong arg 3', async done => {

    try {


        const b = new Bag();
    }
    catch (e) {

        expect(e.message).toEqual('cache.js:throttle(maxRequests, withinTimeMS): maxRequests should be positive integer, it is: undefined');

        done();
    }
});

it('Bag throw wrong arg 4', async done => {

    try {

        new Bag(5, 5, 'd');

    }
    catch (e) {

        expect(e.message).toEqual('cache.js:throttle(maxRequests, withinTimeMS, checkInterval): checkInterval should be positive integer > 50, it is: "d"');

        done();
    }
});

it('Bag 1', async done => {

    const b = new Bag(2, 1000);

    expect(b.isMax()).toBeFalsy();

    done();
});

it('Bag 2', async done => {

    const b = new Bag(2, 1000);

    b.add('key1', 'val');

    expect(b.isMax()).toBeFalsy();

    done();
});

it('Bag 3', async done => {

    const b = new Bag(2, 1000);

    b.add('key1', 'val');

    b.add('key2', 'val');

    expect(b.isMax()).toBeTruthy();

    done();
});

it('Bag 4', async done => {

    const b = new Bag(2, 1000);

    try {

        b.add('key1', 'val');

        b.add('key2', 'val');

        b.add('key3', 'val');
    }
    catch (e) {

        expect(e.message).toEqual('Bag:isMax() -> true');

        done();
    }
});

it('Bag 5', async done => {

    const b = new Bag(2, 1000);

    try {

        b.add('key1', 'val');

        b.add('key1', 'val');
    }
    catch (e) {

        expect(e.message).toEqual(`Bag:add(): key 'key1' already exists`);

        done();
    }
});

it('Bag 6', async done => {

    const b = new Bag(2, 1000);

    try {

        b.add('key1', 'val');

        b.add('key1', 'val');
    }
    catch (e) {

        expect(e.message).toEqual(`Bag:add(): key 'key1' already exists`);

        done();
    }
});

it('Bag 7', async done => {

    const b = new Bag(2, 1000);

    b.add('key1', 'val');

    expect(b.count()).toEqual(1);

    b.remove('key1');

    expect(b.count()).toEqual(0);

    b.add('key1', 'val');

    expect(b.count()).toEqual(1);

    done();
});


it('Bag 8', async done => {

    const b = new Bag(2, 1000);

    try {

        b.add('key');
    }
    catch (e) {

        expect(e.message).toEqual(`Bag:add(): value can't be undefined`);

        done();
    }
});

it('Bag 9', async done => {

    const b = new Bag(2, 1000);

    b.remove('nonexisting');

    done();
});


it('Bag 10', async done => {

    const b = new Bag(2, 1000);

    b.add('nonexisting', 'fdas');

    expect(b.get('nonexisting')).toEqual('fdas');

    done();
});


it('Bag 11', async done => {

    const b = new Bag(2, 1000);

    // b.add('nonexisting', 'fdas');

    expect(b.get('nonexisting')).toBeUndefined();

    done();
});



