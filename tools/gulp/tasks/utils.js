'use strict';

let debug = require('gulp-debug');
let del = require('del');
let util = require('gulp-util');

/**
 * Deletes the specified file(s) or folder(s).
 * @param {string} path Path to the files or folders to delete.
 * @param done Callback to invoke once the delete is completed.
 */
function clean(path, done) {
    log(`    Deleting: ${path}`, util.colors.bgMagenta);
    del(path);
    done(); //TODO: Bug with current version of del that prevents passing done as the second parameter.
}

function log(message, color) {
    if (!color) {
        color = util.colors.bgBlue;
    }
    if (typeof message === 'object') {
        for (let item in message) {
            if (message.hasOwnProperty(item)) {
                util.log(color(message[item]));
            }
        }
    } else {
        util.log(color(message));
    }
}

/**
 * Accepts a glob and marks it as excluded by prepending it with a bang symbol.
 *
 * @param {string} glob File glob to exclude
 * @returns {string}
 */
function exclude(glob) {
    if (typeof glob === 'string') {
        return '!' + glob;
    }
    return glob.map(function(g) {
        return '!' + g;
    });
}

function excludeSpecs(glob) {
    if (typeof glob === 'string') {
        return [glob, exclude(glob.replace('.ts','.spec.ts'))]
    }
    return glob.reduce(function(prev, next) {
        prev.push(next)
        prev.push(exclude(next.replace('.ts', '.spec.ts')));
        return prev;
    }, []);
}

function src(glob, debugTitle) {
    let task = gulp.src(glob);
    //TODO: if (debug)
        task = task.pipe(debug({ title: `[${debugTitle}]` }));
    return task;
}

module.exports = {
    clean: clean,
    exclude: exclude,
    excludeSpecs: excludeSpecs,
    log: log
};
