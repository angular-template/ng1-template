'use strict';

let folders = require('./core.folders');

let options = {};

//Wiredep options for injecting Bower scripts.
//See https://www.npmjs.com/package/wiredep for docs.
// const bowerConfig = `../../../${folders.root}bower.json`;
options.wiredep = {
    ignorePath: '..',
    exclude: []
};

//Typescript compiler options during the dev build.
//See https://www.npmjs.com/package/typescript for docs.
options.typescriptBuild = {
    target: 'ES5',
    declarationFiles: false,
    noExternalResolve: false,
    experimentalDecorators: true
};

//Typescript compiler options during the vet stage.
//See https://www.npmjs.com/package/typescript for docs.
options.typescriptVet = {
    target: 'ES5',
    declarationFiles: false,
    noExternalResolve: false,
    experimentalDecorators: true
};

options.htmlMin = {
    removeComments: true,
    collapseWhitespace: true
};

module.exports = options;
