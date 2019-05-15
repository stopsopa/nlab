'use strict';

const is = require('../../incrementSlug');

it('incrementSlug() - not string', done => {

    try {

        is();
    }
    catch (e) {

        expect(e + '').toEqual('Error: nlab: incrementSlug: slug is not a string');

        done();
    }
});

it('incrementSlug() - empty string', done => {

    try {

        is('');
    }
    catch (e) {

        expect(e + '').toEqual('Error: nlab: incrementSlug: slug is an empty string');

        done();
    }
});

it('incrementSlug() - delimiter is not a string', done => {

    try {

        is('test', false);
    }
    catch (e) {

        expect(e + '').toEqual('Error: nlab: incrementSlug: delimiter is not a string');

        done();
    }
});

it('incrementSlug() - delimiter is an empty string', done => {

    try {

        is('test', '');
    }
    catch (e) {

        expect(e + '').toEqual('Error: nlab: incrementSlug: delimiter should containe only one character it contains: \'\'');

        done();
    }
});

it('incrementSlug() - delimiter - two characters', done => {

    try {

        is('test', 'ab');
    }
    catch (e) {

        expect(e + '').toEqual('Error: nlab: incrementSlug: delimiter should containe only one character it contains: \'ab\'');

        done();
    }
});

it('incrementSlug() - test', done => {

    expect(is('test')).toEqual('test-1');

    done();
});

it('incrementSlug() - test-1', done => {

    expect(is('test-1')).toEqual('test-2');

    done();
});

it('incrementSlug() - delimiter - two characters', done => {

    try {

        is('test-01');
    }
    catch (e) {

        expect(e + '').toEqual(`Error: nlab: incrementSlug: found number sufix can't be incremented, the raw sufix is: '01'`);

        done();
    }
});


it('incrementSlug() - x100 1', done => {

    let test = 'one-two-56-three';

    for (let i = 0 ; i < 100 ; i += 1 ) {

        test = is(test);
    }

    expect(test).toEqual(`one-two-56-three-100`);

    done();
});



it('incrementSlug() - x100 2', done => {

    let test = 'one-two-56-three-1';

    for (let i = 0 ; i < 100 ; i += 1 ) {

        test = is(test);
    }

    expect(test).toEqual(`one-two-56-three-101`);

    done();
});



it('incrementSlug() - x100 3', done => {

    let test = 'one-two-56-three-34';

    for (let i = 0 ; i < 100 ; i += 1 ) {

        test = is(test);
    }

    expect(test).toEqual(`one-two-56-three-134`);

    done();
});

it('incrementSlug() - x100 4', done => {

    let test = 'one-two-56-three-34';

    for (let i = 0 ; i < 100 ; i += 1 ) {

        test = is(test, '_');
    }

    expect(test).toEqual(`one-two-56-three-34_100`);

    done();
});


it('incrementSlug() - x100 5', done => {

    let test = 'one-two-56-three_34';

    for (let i = 0 ; i < 100 ; i += 1 ) {

        test = is(test, '_');
    }

    expect(test).toEqual(`one-two-56-three_134`);

    done();
});

it('incrementSlug() - x100 6', done => {

    let test = 'one-two-56-three_34';

    for (let i = 0 ; i < 100 ; i += 1 ) {

        test = is(test, '/');
    }

    expect(test).toEqual(`one-two-56-three_34/100`);

    done();
});

it('incrementSlug() - x100 7', done => {

    let test = 'one-two-56-three/34';

    for (let i = 0 ; i < 100 ; i += 1 ) {

        test = is(test, '/');
    }

    expect(test).toEqual(`one-two-56-three/134`);

    done();
});


