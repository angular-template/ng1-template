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

    //List of all Typescript files to compile.
    opts.tsToCompile = opts.tsToCompile || ['**/*.ts'];
    //Additional JavaScript files to copy to the output folder.
    opts.jsToCopy = opts.jsToCopy || [];
    //Folder where the Typescript files are compiled to and the additional JavaScript files are copied to.
    opts.jsOutputFolder = opts.jsOutputFolder || name;
    //All the JavaScript files from the output folder to inject into the shell HTML, in the correct order.
    opts.jsToInject = opts.jsToInject || ['**/*.js'];
    //List of JavaScript files to inject before any other scripts.
    opts.firstInjectJs = opts.firstInjectJs || [
        `${name}.module.js`,
        `config/*.config.js`
    ],

    opts.lessToCompile = opts.lessToCompile || [];
    opts.lessToLint = opts.lessToLint || ['**/*.less'];
    opts.lessToWatch = opts.lessToWatch || ['**/*.ts'];
    opts.cssToCopy = opts.cssToCopy || [];

    opts.htmls = opts.htmls || {
        all: '**/*.html',
        root: `/client/modules/${name}`,
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

    opts.tsToCompile = _prefixAll(opts.tsToCompile, opts.folder);
    //TODO: opts.jsToCopy
    opts.jsOutputFolder = _makeFolder(`${folders.devBuildScripts}${opts.jsOutputFolder}/`);
    opts.jsToInject = _prefixAll(opts.jsToInject, opts.jsOutputFolder);
    opts.firstInjectJs = _prefixAll(opts.firstInjectJs, opts.jsOutputFolder);

    opts.lessToCompile = _prefixAll(opts.lessToCompile, opts.folder);
    opts.lessToLint = _prefixAll(opts.lessToLint, opts.folder);
    opts.lessToWatch = _prefixAll(opts.lessToWatch, opts.folder);
    opts.cssToCopy = _prefixAll(opts.cssToCopy, opts.folder);

    opts.htmls.all = `${opts.folder}${opts.htmls.all}`;
    opts.htmls.toCache = `${opts.folder}${opts.htmls.toCache}`;

    return opts;
}

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
    createModule: createModule,
    exclude: exclude
};
