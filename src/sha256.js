
const node = require('../isNode');

let tool;

if (node) {

    const crypto = eval('require')('crypto');

    tool = str => {

        if ( typeof str !== 'string' ) {

            throw 'nlab:sha256: given value is not a string';
        }

        const hash = crypto.createHash('sha256');

        hash.update(str);

        return hash.digest('hex').toUpperCase();
    };
}
else {

    throw new Error('nlab:sha256: browser implementation not available');
}

module.exports = tool;