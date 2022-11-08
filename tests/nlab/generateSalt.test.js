
const generateSalt = require('../../generateSalt');

jest.setTimeout(100);

it(`generateSalt - len`, async done => {

    const salt = generateSalt();

    expect(typeof salt).toEqual('string');

    expect(salt.length).toEqual(12);

    done();
});

it(`generateSalt - 1`, async done => {

    const salt = generateSalt(1);

    expect(typeof salt).toEqual('string');

    expect(salt.length).toEqual(1);

    done();
});

it(`generateSalt - false`, async done => {

    try {

        generateSalt(false);

        done('error');
    }
    catch (e) {

        expect(String(e)).toEqual('Error: generateSalt error: characters is not an integer');

        done();
    }

});

it(`generateSalt - -1`, async done => {

    try {

        generateSalt(-1);

        done('error');
    }
    catch (e) {

        expect(String(e)).toEqual('Error: generateSalt error: characters < 1');

        done();
    }

});

