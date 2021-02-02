
const stringToRegex = require('../../stringToRegex');

function d(regex) {

    return {
        flags   : regex.flags,
        source  : regex.source,
        str     :  regex.toString(),
    }
}

function e(regex) {

    return expect(d(regex));
}

it('stringToRegex basic', done => {

    try {

        const r = stringToRegex('/abc/i');

        // console.log(JSON.stringify(d(r), null, 4));

        e(r).toEqual({
            "flags": "i",
            "source": "abc",
            "str": "/abc/i"
        });

        done();
    }
    catch (e) {

        done(String(e))
    }
});

it('stringToRegex simple error', done => {

    try {

        const r = stringToRegex('abc/i');

        console.log(JSON.stringify(d(r), null, 4));

        e(r);

        done('error');
    }
    catch (e) {

        expect(String(e)).toEqual("Error: stringToRegex error: general error: string 'abc/i' error: Error: param 'abc/i' doesn't seem to be proper regex");

        done()
    }
});

it('stringToRegex slash', done => {

    try {

        const r = stringToRegex('/abc\\/abcf/i');

        // console.log(JSON.stringify(d(r), null, 4));

        e(r).toEqual({
            "flags": "i",
            "source": "abc\\/abcf",
            "str": "/abc\\/abcf/i"
        });

        done();
    }
    catch (e) {

        done(String(e))
    }
});

it('stringToRegex simple error', done => {

    try {

        const r = stringToRegex('/abc/def/i');

        console.log(JSON.stringify(d(r), null, 4));

        e(r);

        done('error');
    }
    catch (e) {

        expect(String(e)).toEqual("Error: stringToRegex error: general error: string '/abc/def/i' error: Error: param '/abc/def/i' splits to more than 2 segments");

        done()
    }
});