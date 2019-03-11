
const path      = require('path');

const fs        = require('fs');

const express   = require('express');

const app = express();

const server    = require('http').Server(app);

const io        = require('socket.io')(server); // io

const log       = require('inspc');

// https://stackoverflow.com/a/23613092
// const serveIndex    = require('serve-index');

const bodyParser    = require('body-parser');

const host      = '0.0.0.0';

const port      = 8080;

const web = path.resolve(__dirname, '.');

// const readFile = file => fs.readFileSync(file).toString();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// app.all('/save', (req, res) => {
//
//     const cookies = decodeURIComponent(req.headers.cookie || '').split(';').reduce((acc, coo) => {
//         const tmp   = coo.split('=');
//         const name  = tmp.shift().trim();
//         const value = tmp.join('=').trim();
//         name && (acc[name] = value);
//         return acc;
//     }, {});
//
//     log('save');
//     log(JSON.stringify(req.body));
//
//     res.setHeader('Content-type', 'application/json; charset=utf-8');
//     res.end(JSON.stringify({
//         ok: true
//     }));
// })

// app.all('/root', (req, res) => {
//
//     const html  = readFile(path.resolve(__dirname, 'public', '_index.html'));
//
//     const svg   = readFile(path.resolve(__dirname, 'public', 'tree.svg'));
//
//     const tmp = template(html);
//
//     res.end(tmp({
//         svg
//     }));
// });

app.use(express.static(web, { // http://expressjs.com/en/resources/middleware/serve-static.html
    // maxAge: 60 * 60 * 24 * 1000 // in milliseconds
    maxAge: '356 days', // in milliseconds max-age=30758400
    setHeaders: (res, path) => {

        if (/\.bmp$/i.test(path)) { // for some reason by default express.static sets here Content-Type: image/x-ms-bmp

            res.setHeader('Content-type', 'image/bmp')
        }

        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
        // res.setHeader('Cache-Control', 'public, no-cache, max-age=30758400')
        // res.setHeader('Cache-Control', 'public, only-if-cached')
    }
}));

const throttlePromises = require('./src/throttlePromises');

const iolog = require('./test/public/io')({
    io,
});

const cache = throttlePromises({
    requests : 3,
    perTimeMsec : 3 * 1000,
    dump: data => {
        iolog('data', data);
    },
});

const now = () => (new Date()).toISOString().substring(0, 19).replace('T', ' ')


io.on('connection', socket => {

    console.log('connect..');

    socket.on('gimi', () => {

        console.log('gimi came');

        iolog('data', {
            event: `init`,
            inspect: cache.inspect(),
            lastInfo: cache.lastInfo(),
        })
    })
});

/**
 * visit: http://localhost:8080/controller/promiseCache.html
 */
app.all('/data3', (req, res) => {

    iolog('data', {data: 'test from node'});

    const create = f => {

        console.log(now() + ` ----create3 ${f}----`);

        return Promise.resolve(`testdatafrompromise 3 ${f}`);
    }

    const f =  req.query.f || 'query';

    let time = 8 * 1000;

    // if (f === 'three') {
    //
    //     time = 1500 * 1000
    //     // log.dump('wlazł' + time);
    // }

    cache(f, () => create(f), time).then(data => {

        res.set(`Content-Type`, `application/json; charset=utf-8`);

        if (cache.lastInfo() === 'cache') {

            res.statusCode = 304;
        }

        res.end(JSON.stringify({
            page: {
                query: req.query,
                json: req.body,
            },
            node: process.version,
            cache: data,
            source: cache.lastInfo(),
            inspect: cache.inspect(),
        }, null, 4));
    });
});

app.all('/inspect', (req, res) => {
    res.json({
        m: 'inspect',
        inspect: cache.inspect(),
        lastInfo: cache.lastInfo(),
    });
})

app.all('/clear', (req, res) => {

    cache.clear();

    res.json({
        m: 'clear',
        inspect: cache.inspect(),
        lastInfo: cache.lastInfo(),
    });
})

app.all('/trigger', (req, res) => {

    cache.trigger();

    res.json({
        m: 'trigger',
        inspect: cache.inspect(),
        lastInfo: cache.lastInfo(),
    });
});

server.listen(port, host, undefined, () => {

    console.log(`\n 🌎  Server is running ` + `${host}:${port}\n`)
});