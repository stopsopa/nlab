'use strict';

const ms = require('../../ms');

const generate = ms.generate;

const log = require('inspc')

it('ms.generate 1', async done => {

    try {

        const v = generate({
            ms: 2000,
        });

        expect(v).toEqual(2000);

        done();
    }
    catch (e) {

        expect(String(e)).toEqual("Error: nlab/ms library error: time is not a number");

        done(`this test shouldn't crush`);
    }
});

it('ms.generate 2000ms 5s', async done => {

    try {

        const v = generate({
            ms: 2000,
            s: 5,
        });

        expect(v).toEqual(7000);

        done();
    }
    catch (e) {

        expect(String(e)).toEqual("Error: nlab/ms library error: time is not a number");

        done(`this test shouldn't crush`);
    }
});

it('ms.generate 56ms 5s', async done => {

    try {

        const v = generate({
            ms: 56,
            s: 5,
        });

        expect(v).toEqual(5056);

        done();
    }
    catch (e) {

        expect(String(e)).toEqual("Error: nlab/ms library error: time is not a number");

        done(`this test shouldn't crush`);
    }
});

it('ms.generate 56ms 5s 4d', async done => {

    try {

        const v = generate({
            ms: 56,
            d: 4,
            s: 5,
        });

        expect(v).toEqual(345605056);

        done();
    }
    catch (e) {

        expect(String(e)).toEqual("Error: nlab/ms library error: time is not a number");

        done(`this test shouldn't crush`);
    }
});

it('ms.generate 56ms 5s 0d', async done => {

    try {

        const v = generate({
            ms: 56,
            d: 0,
            s: 5,
        });

        expect(v).toEqual(5056);

        done();
    }
    catch (e) {

        expect(String(e)).toEqual("Error: nlab/ms library error: time is not a number");

        done(`this test shouldn't crush`);
    }
});

it('ms.generate 56ms 0s 0d', async done => {

    try {

        const v = generate({
            ms: 56,
            d: 0,
            s: 0,
        });

        expect(v).toEqual(56);

        done();
    }
    catch (e) {

        expect(String(e)).toEqual("Error: nlab/ms library error: time is not a number");

        done(`this test shouldn't crush`);
    }
});

it('ms.generate 0ms 0s 0d', async done => {

    try {

        const v = generate({
            ms: 0,
            d: 0,
            s: 0,
        });

        expect(v).toEqual(0);

        done();
    }
    catch (e) {

        expect(String(e)).toEqual("Error: nlab/ms library error: time is not a number");

        done(`this test shouldn't crush`);
    }
});

it('ms.generate 56ms 5s 19h 4d', async done => {

    try {

        const v = generate({
            ms: 56,
            s: 5,
            h: 19,
            d: 4,

        });

        expect(v).toEqual(345605056 + 68400000);

        done();
    }
    catch (e) {

        expect(String(e)).toEqual("Error: nlab/ms library error: time is not a number");

        done(`this test shouldn't crush`);
    }
});

it('ms.generate 56ms 5s 19h 4d 6y', async done => {

    try {

        const v = generate({
            ms: 56,
            s: 5,
            h: 19,
            d: 4,
            y: 6
        });

        expect(v).toEqual(345605056 + 68400000 + 189216000000);

        done();
    }
    catch (e) {

        expect(String(e)).toEqual("Error: nlab/ms library error: time is not a number");

        done(`this test shouldn't crush`);
    }
});

it('ms.generate 56ms 5s 19h 4d 0y', async done => {

    try {

        const v = generate({
            ms: 56,
            s: 5,
            h: 19,
            d: 4,
            y: 0
        });

        expect(v).toEqual(345605056 + 68400000 + 0);

        done();
    }
    catch (e) {

        expect(String(e)).toEqual("Error: nlab/ms library error: time is not a number");

        done(`this test shouldn't crush`);
    }
});

it('ms.generate 56ms 5s 19h 4d 0y 7z', async done => {

    try {

        const v = generate({
            ms: 58,
            s: 5,
            h: 19,
            d: 4,
            y: 0,
            z: 7
        });

        expect(v).toEqual(345605058 + 68400000 + 0);

        done();
    }
    catch (e) {

        expect(String(e)).toEqual("Error: nlab/ms library error: time is not a number");

        done(`this test shouldn't crush`);
    }
});

it('ms.generate 56ms 5s 45m 19h 4d 6y', async done => {

    try {

        const v = generate({
            ms: 56,
            s: 5,
            m: 45,
            h: 19,
            d: 4,
            y: 6
        });

        expect(v).toEqual(345605056 + 68400000 + 189216000000 + 2700000);

        done();
    }
    catch (e) {

        expect(String(e)).toEqual("Error: nlab/ms library error: time is not a number");

        done(`this test shouldn't crush`);
    }
});

it('ms.generate 56ms 5s 145m 19h 4d 6y', async done => {

    try {

        const v = generate({
            ms: 56,
            s: 5,
            m: 145,
            h: 19,
            d: 4,
            y: 6
        }, 'ms');

        expect(v).toEqual(56 + 345605000 + 68400000 + 189216000000 + 8700000);

        done();
    }
    catch (e) {

        expect(String(e)).toEqual("Error: nlab/ms library error: time is not a number");

        done(`this test shouldn't crush`);
    }
});

it('ms.generate 0ms 0s 0m 0h 0d 0y', async done => {

    try {

        const v = generate({
            ms: 0,
            s: 0,
            m: 0,
            h: 0,
            d: 0,
            y: 0,
        });

        expect(v).toEqual(0);

        done();
    }
    catch (e) {

        expect(String(e)).toEqual("Error: nlab/ms library error: time is not a number");

        done(`this test shouldn't crush`);
    }
});

it('ms.generate 0ms 0s 0m 0h 0d 1y', async done => {

    try {

        const v = generate({
            ms: 0,
            s: 0,
            m: 0,
            h: 0,
            d: 0,
            y: 1,
            z: 0,
        });

        expect(v).toEqual(1000 * 60 * 60 * 24 * 365);

        done();
    }
    catch (e) {

        expect(String(e)).toEqual("Error: nlab/ms library error: time is not a number");

        done(`this test shouldn't crush`);
    }
});

it('ms.generate wrong unit', async done => {

    try {

        const v = generate({
            ms: 0,
            s: 0,
            m: 0,
            h: 0,
            d: 0,
            y: 1,
            z: 0,
        }, 'z');

        expect(v).toEqual(1000 * 60 * 60 * 24 * 365);

        done(`this test should crush`);
    }
    catch (e) {

        expect(String(e)).toEqual("Error: nlab/ms library error: generate: unknown unit (z), valid units are: 'ms, s, m, h, d, y'");

        done();
    }
});

it('ms.generate 56ms 60s 145m 19h 4d 6y - m', async done => {

    try {

        const v = generate({
            ms: 56,
            s: 60, // 1
            m: 145,
            h: 19, // 1140
            d: 4, // 5760
            y: 6 // 3153600
        }, 'm');

        expect(v).toEqual(1 + 145 + 1140 + 5760 + 3153600);

        done();
    }
    catch (e) {

        expect(String(e)).toEqual("Error: nlab/ms library error: time is not a number");

        done(`this test shouldn't crush`);
    }
});

it('ms.generate 950400000ms 518400s 4320m 49h 4d 6y - d', async done => {

    try {

        const v = generate({
            ms: 950400000, // 11
            s: 518400, // 6
            m: 4320, // 3
            h: 49, // 2
            d: 4, // 4
            y: 6 // 2190
        }, 'd');

        expect(v).toEqual(11 + 6 + 3 + 2 + 4 + 2190);

        done();
    }
    catch (e) {

        expect(String(e)).toEqual("Error: nlab/ms library error: time is not a number");

        done(`this test shouldn't crush`);
    }
});

it('ms.generate unit y', async done => {

    try {

        const v = generate({
            ms: 0,
            s: 0,
            m: 0,
            h: 0,
            d: 0,
            y: 1,
            z: 0,
        }, 'y');

        expect(v).toEqual(1);

        done();
    }
    catch (e) {

        expect(String(e)).toEqual("Error: nlab/ms library error: generate: unknown unit (z), valid units are: 'ms, s, m, h, d, y'");

        done(`this test shouldn't crush`);
    }
});

// // it('ms - no opt ', async done => {
// //
// //     try {
// //
// //         const h = ms(60);
// //
// //         expect(h).toEqual("Error: nlab/ms library error: opt 'mss' is string but it is not on the list: 'ms, s, m, h, d, y'");
// //
// //         done();
// //     }
// //     catch (e) {
// //
// //         done(`shouldn't throw error: ${e}`);
// //     }
// // });
//
//
// it('ms - wrong opt', async done => {
//
//     try {
//
//         ms(60, 'mss');
//
//         done(`should throw error`);
//     }
//     catch (e) {
//
//         expect(String(e)).toEqual("Error: nlab/ms library error: opt 'mss' is string but it is not on the list: 'ms, s, m, h, d, y'");
//
//         done();
//     }
// });

// it('ms - first arg not a number', async done => {
//
//     try {
//
//         ms();
//
//         done(`should throw error`);
//     }
//     catch (e) {
//
//         expect(String(e)).toEqual("Error: nlab/ms library error: time is not a number");
//
//         done();
//     }
// });
//
//
