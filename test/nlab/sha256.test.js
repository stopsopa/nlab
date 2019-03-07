
const sha256 = require('../../sha256');

/**
 * https://passwordsgenerator.net/sha256-hash-generator/
 */
it(`sha256 - compatibility`, async done => {

    expect(sha256('a')).toEqual('CA978112CA1BBDCAFAC231B39A23DC4DA786EFF8147C4E72B9807785AFEE48BB');

    expect(sha256('A')).toEqual('559AEAD08264D5795D3909718CDD05ABD49572E84FE55590EEF31A88A08FDFFD');

    expect(sha256('test')).toEqual('9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08');

    done();
});