
const cache = require(`../test/public/cache`);

const now = () => (new Date()).toISOString().substring(0, 19).replace('T', ' ');

const create = f => {
    console.log(now() + `----create3 ${f}----`)
    return Promise.resolve(`testdatafrompromise 3 ${f}`);
}

const controller = (req, res, query = {}, json = {}) => {

    const f =  query.f || 'query';

    let time = 3 * 1000;

    if (f === 'three') {


        time = 1500 * 1000
        log.dump('wlazł' + time);
    }

    cache(f, () => create(f), time).then(data => {

        res.setHeader(`Content-Type`, `application/json; charset=utf-8`);

        if (cache.lastInfo() === 'from cache') {

            // res.statusCode = 304;
        }

        res.end(JSON.stringify({
            page: {
                query,
                json,
            },
            node: process.version,
            cache: data,
            source: cache.lastInfo(),
            inspect: cache.inspect(),
        }, null, 4));
    });
};

controller.url = `/data3`;

module.exports = controller;
