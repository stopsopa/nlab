
const sha256 = require('../../sha256');

/**
 * https://passwordsgenerator.net/sha256-hash-generator/
 */
it(`sha256 - compatibility`, async done => {

    expect(sha256('a')).toEqual('ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb');

    expect(sha256('A')).toEqual('559aead08264d5795d3909718cdd05abd49572e84fe55590eef31a88a08fdffd');

    expect(sha256('test')).toEqual('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');

    done();
});