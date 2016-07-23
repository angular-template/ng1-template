'use strict';

/**
 * Accepts a glob and marks it as excluded by prepending it with a bang symbol.
 *
 * @param {string} glob File glob to exclude
 * @returns {string}
 */
let exclude = function(glob) {
    if (typeof glob === 'string') {
        return '!' + glob;
    }
    return glob.map(function(g) {
        return '!' + g;
    });
};

let excludeSpecs = function (glob) {
    if (typeof glob === 'string') {
        return [glob, exclude(glob.replace('.ts','.spec.ts'))]
    }
    return glob.reduce(function(prev, next) {
        prev.push(next)
        prev.push(exclude(next.replace('.ts', '.spec.ts')));
        return prev;
    }, []);
}

module.exports = {
    exclude: exclude,
    excludeSpecs: excludeSpecs
};
