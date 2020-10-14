
const promiseany = require('../../promiseany');

jest.setTimeout(20000);
// jest.setTimeout(500);

it('promiseany no args', async done => {

    try {

        await promiseany();
    }
    catch (e) {

        expect(String(e)).toEqual("Error: promiseany error: list is not an array");

        done();
    }
});

it('promiseany wrong arg', async done => {

    try {

        await promiseany(true);
    }
    catch (e) {

        expect(String(e)).toEqual("Error: promiseany error: list is not an array");

        done();
    }
});

it('promiseany empty array', async done => {

    try {

        await promiseany([]);
    }
    catch (e) {

        expect(String(e)).toEqual("Error: promiseany error: list.length === 0");

        done();
    }
});

it('promiseany one is not a promise', async done => {

    try {

        await promiseany([
            Promise.resolve('abc'),
            () => {},
            Promise.reject('zdd')
        ]);
    }
    catch (e) {

        expect(String(e)).toEqual("Error: promiseany error: list[1] is not a promise");

        done();
    }
});

it('promiseany one is not a promise 2', async done => {

    try {

        await promiseany([
            () => {},
        ]);
    }
    catch (e) {

        expect(String(e)).toEqual("Error: promiseany error: list[0] is not a promise");

        done();
    }
});

it('promiseany 3 resolved', async done => {

    const data = await promiseany([
        Promise.resolve('abc'),
        Promise.resolve('cde'),
        Promise.resolve('efg'),
    ]);

    expect(data).toEqual("abc");

    done();
});

it('promiseany 3 resolved ver 2', async done => {

    const data = await promiseany([
        new Promise((resolve, reject) => {
            setTimeout(() => resolve('abc'), 50)
        }),
        Promise.resolve('cde'),
        Promise.resolve('efg'),
    ]);

    expect(data).toEqual("cde");

    done();
});

it('promiseany 3 resolved ver 3', async done => {

    const data = await promiseany([
        new Promise((resolve, reject) => {
            setTimeout(() => resolve('abc'), 150)
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => resolve('cde'), 50)
        }),
        Promise.resolve('efg'),
    ]);

    expect(data).toEqual("efg");

    done();
});

it('promiseany 3 resolved ver 4', async done => {

    const data = await promiseany([
        new Promise((resolve, reject) => {
            setTimeout(() => resolve('abc'), 150)
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => resolve('cde'), 50)
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => resolve('ddd'), 20)
        }),
        Promise.resolve('efg'),
    ]);

    expect(data).toEqual("efg");

    done();
});

it('promiseany 3 resolved ver 5', async done => {

    const data = await promiseany([
        new Promise((resolve, reject) => {
            setTimeout(() => resolve('abc'), 150)
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => resolve('cde'), 50)
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => resolve('ddd'), 20)
        }),
    ]);

    expect(data).toEqual("ddd");

    done();
});

it('promiseany 3 resolved ver 6', async done => {

    const data = await promiseany([
        new Promise((resolve, reject) => {
            setTimeout(() => resolve('abc'), 150)
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => resolve('cde'), 10)
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => resolve('ddd'), 50)
        }),
    ]);

    expect(data).toEqual("cde");

    done();
});

it('promiseany 3 reject 1', async done => {

    const data = await promiseany([
        new Promise((resolve, reject) => {
            setTimeout(() => resolve('abc'), 150)
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => reject('cde'), 10)
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => resolve('ddd'), 50)
        }),
    ]);

    expect(data).toEqual("ddd");

    done();
});

it('promiseany 3 reject 2', async done => {

    const data = await promiseany([
        new Promise((resolve, reject) => {
            setTimeout(() => resolve('abc'), 150)
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => reject('cde'), 10)
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => reject('ddd'), 50)
        }),
    ]);

    expect(data).toEqual("abc");

    done();
});

it('promiseany 3 reject 3', async done => {

    try {

        const data = await promiseany([
            new Promise((resolve, reject) => {
                setTimeout(() => reject('abc'), 150)
            }),
            new Promise((resolve, reject) => {
                setTimeout(() => reject('cde'), 10)
            }),
            new Promise((resolve, reject) => {
                setTimeout(() => reject('ddd'), 50)
            }),
        ]);
    }
    catch (e) {

        expect(e).toEqual(["abc", "cde", "ddd"]);

        done();
    }
});

it('promiseany 3 reject by throw', async done => {

    try {

        const data = await promiseany([
            new Promise((resolve, reject) => {
                setTimeout(() => reject('abc'), 150)
            }),
            new Promise((resolve, reject) => {

                throw new Error('throw...')
            }),
            new Promise((resolve, reject) => {
                setTimeout(() => reject('ddd'), 50)
            }),
        ]);
    }
    catch (e) {

        expect(String(e)).toEqual("abc,Error: throw...,ddd");

        done();
    }
});

it('promiseany 3 reject by throw both', async done => {

    try {

        const data = await promiseany([
            new Promise((resolve, reject) => {

                throw new Error('throw 1')
            }),
            new Promise((resolve, reject) => {

                throw new Error('throw 2')
            }),
        ]);
    }
    catch (e) {

        expect(String(e)).toEqual("Error: throw 1,Error: throw 2");

        done();
    }
});