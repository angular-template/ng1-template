'use strict';

let gulp = require('gulp');
let $ = require('gulp-load-plugins')({lazy: true});
let del = require('del');
let args = require('yargs').argv;

let debug = args.debug;

/**
 * Deletes the specified file(s) or folder(s).
 * @param {string} path Path to the files or folders to delete.
 * @param done Callback to invoke once the delete is completed.
 */
function clean(path, done) {
    log2(`Deleting: ${path}`);
    del(path);
    done(); //TODO: Bug with current version of del that prevents passing done as the second parameter.
}

function log(message, color) {
    if (!color) {
        color = $.util.colors.white.bgBlue;
    }
    if (typeof message === 'object') {
        for (let item in message) {
            if (message.hasOwnProperty(item)) {
                $.util.log(color(message[item]));
            }
        }
    } else {
        $.util.log(color(message));
    }
}

function log2(message, color) {
    log(`    ${message}`, color || $.util.colors.white.bgCyan);
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

//TODO: Make this a configuration
let usePlumber = false;

function src(glob, debugTitle) {
    let task = gulp.src(glob);
    if (debug) {
        task = task.pipe($.debug({ title: `[${debugTitle}]` }));
    }
    if (usePlumber) {
        task = task.pipe($.plumber());
    }
    return task;
}

module.exports = {
    clean: clean,
    exclude: exclude,
    excludeSpecs: excludeSpecs,
    log: log,
    log2: log2,
    src: src
};
