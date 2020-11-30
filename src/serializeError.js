'use strict';

/**
 * Logic from https://github.com/sindresorhus/serialize-error
 * Just adopted to node version 8
 * and added splitting 'stack' field
 */

const commonProperties = [
    {property: 'name', enumerable: false},
    {property: 'message', enumerable: false},
    {property: 'stack', enumerable: false},
    {property: 'code', enumerable: true}
];

const destroyCircular = ({from, seen, to_, forceEnumerable}) => {
    const to = to_ || (Array.isArray(from) ? [] : {});

    seen.push(from);

    for (const [key, value] of Object.entries(from)) {
        if (typeof value === 'function') {
            continue;
        }

        if (!value || typeof value !== 'object') {
            to[key] = value;
            continue;
        }

        if (!seen.includes(from[key])) {
            to[key] = destroyCircular({from: from[key], seen: seen.slice(), forceEnumerable});
            continue;
        }

        to[key] = '[Circular]';
    }

    for (const {property, enumerable} of commonProperties) {
        if (typeof from[property] === 'string') {
            Object.defineProperty(to, property, {
                value: from[property],
                enumerable: forceEnumerable ? true : enumerable,
                configurable: true,
                writable: true
            });
        }
    }

    return to;
};

const serializeError = value => {
    if (typeof value === 'object' && value !== null) {
        return destroyCircular({from: value, seen: [], forceEnumerable: true});
    }

    // People sometimes throw things besides Error objects…
    if (typeof value === 'function') {
        // `JSON.stringify()` discards functions. We do too, unless a function is thrown directly.
        return `[Function: ${(value.name || 'anonymous')}]`;
    }

    return value;
};

module.exports = function (e, native) {

    e = serializeError(e);

    if ( ! native ) {

        if (typeof e.stack === 'string') {

            e.stack = e.stack.split("\n")
        }
    }

    return e;
}
