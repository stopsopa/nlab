
const parallel = require('../../parallel');

jest.setTimeout(10000);

it('no setup exception', async done => {

    try {

        const p = parallel();

        p(function () {});
    }
    catch (e) {

        expect(String(e)).toEqual("Error: parallel.js error: opt.numberOfThreads is undefined, first use setup() method");

        done()
    }

});

it('simple', async done => {

    const p = parallel();

    p.setup({
        numberOfThreads: 3,
    });

    const stack = [];

    p(function (key, release) {

        stack.push(key);

        setTimeout(() => release(), 300)

    });

    p(function (key, release) {

        stack.push(key);

        setTimeout(() => release(), 10)

    });

    p(function (key, release) {

        stack.push(key);

        setTimeout(() => release(), 30)

    });

    p(function (key, release) {

        stack.push(key);

        setTimeout(() => release(), 40)

    });

    p(function (key, release) {

        stack.push(key);

        setTimeout(() => release(), 50)

    });

    p(function (key, release) {

        stack.push(key);

        setTimeout(() => release(), 70)

    });

    p(function (key, release) {

        stack.push(key);

        setTimeout(() => release(), 90)

    });

    p(function (key, release) {

        stack.push(key);

        setTimeout(() => release(), 110)

    });

    p(function (key, release) {

        stack.push(key);

        setTimeout(() => release(), 130)

    });

    p(function (key, release) {

        stack.push(key);

        setTimeout(() => release(), 150)

    });

    setTimeout(function () {

        // console.log(JSON.stringify(stack, null, 4));

        expect(stack).toEqual([
            "1",
            "2",
            "3",
            "2",
            "3",
            "2",
            "3",
            "2",
            "3",
            "2"
        ])

        done();
    }, 400);


});

it('setup on the way', async done => {

    const p = parallel();

    p.setup({
        numberOfThreads: 3,
    });

    const stack = [];

    p(function (key, release) {

        stack.push(key);

        setTimeout(() => release(), 10)

    });

    p(function (key, release) {

        stack.push(key);

        setTimeout(() => release(), 20)

    });

    p(function (key, release) {

        stack.push(key);

        setTimeout(() => release(), 30)

    });

    p(function (key, release) {

        stack.push(key);

        setTimeout(() => release(), 40)

    });

    p(function (key, release) {

        stack.push(key);

        setTimeout(() => release(), 50)

    });

    p(function (key, release) {

        stack.push(key);

        setTimeout(() => {

            p.setup({numberOfThreads:2})

            release();
        }, 70)

    });

    p(function (key, release) {

        stack.push(key);

        setTimeout(() => release(), 80)

    });

    p(function (key, release) {

        stack.push(key);

        setTimeout(() => release(), 90)

    });

    p(function (key, release) {

        stack.push(key);

        setTimeout(() => release(), 100)

    });

    p(function (key, release) {

        stack.push(key);

        setTimeout(() => release(), 110)

    });

    setTimeout(function () {

        // console.log(JSON.stringify(stack, null, 4));

        expect(stack).toEqual([
            "1",
            "2",
            "3",
            "1",
            "2",
            "3",
            "1",
            "2",
            "1",
            "2"
        ])

        done();
    }, 200);

});