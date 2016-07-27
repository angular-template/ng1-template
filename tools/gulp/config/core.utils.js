'use strict';

let folders = require('./core.folders');

let createModule = function(moduleName, options) {
    options = options || {};
    options.name = moduleName;
    options = _assignDefaults(moduleName, options);
    options = _makeAbsolutePaths(moduleName, options);
    return options;
}

function _assignDefaults(name, opts) {
    //Base source folder for the module
    opts.folder = opts.folder || name;

    //Base namespace for the module
    opts.ns = opts.ns || name;

    //Additional dependencies for the module
    opts.dependencies = opts.dependencies || [];

    //Style specifications for the module
    if (!opts.styles) {
        opts.styles = {};
    }
    opts.styles.less = opts.styles.less || [`${opts.name}.less`];
    opts.styles.sass = opts.styles.sass || [`${opts.name}.less`];

    //Folder where the Typescript files are compiled to and the additional JavaScript files are copied to.
    opts.jsOutputFolder = opts.jsOutputFolder || name;
    //All the JavaScript files from the output folder to inject into the shell HTML, in the correct order.
    opts.jsToInject = opts.jsToInject || ['**/*.js'];
    //List of JavaScript files to inject before any other scripts.
    opts.firstInjectJs = opts.firstInjectJs || [
        `${name}.module.js`,
        `config/*.config.js`
    ],

    opts.htmls = opts.htmls || {
        all: '**/*.html',
        root: `/client/modules/${opts.folder}`,
        toCache: '**/*.html'
    };

    return opts;
}

function _prefixAll(list, prefix) {
    return list.map((item, index, array) => prefix + item);
}

function _makeFolder(folder) {
    return folder[folder.length - 1] === '/' ? folder : folder + '/';
}

function _makeAbsolutePaths(name, opts) {
    opts.folder = _makeFolder(`${folders.modules}${opts.folder}`);

    opts.styles.less = _prefixAll(opts.styles.less, opts.folder);
    opts.styles.sass = _prefixAll(opts.styles.sass, opts.folder);

    opts.jsOutputFolder = _makeFolder(`${folders.devBuildScripts}${opts.jsOutputFolder}/`);
    opts.jsToInject = _prefixAll(opts.jsToInject, opts.jsOutputFolder);
    opts.firstInjectJs = _prefixAll(opts.firstInjectJs, opts.jsOutputFolder);

    opts.htmls.all = `${opts.folder}${opts.htmls.all}`;
    opts.htmls.toCache = `${opts.folder}${opts.htmls.toCache}`;

    return opts;
}

module.exports = {
    createModule: createModule
};
