'use strict';

let folders = require('./core.folders');
let modules = require('./modules').modules;

//TODO: Change files to a delegate that accepts the module
module.exports = [
    {
        description: 'Default rules',
        config: `${folders.tools}tslint/default.json`,
        files: modules
            .reduce((files, mod) => files.concat(mod.tsToCompile || `${mod.folder}**/*.ts`), [])
    }
];
