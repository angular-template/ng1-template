'use strict';

let folders = require('./core.folders');

//TODO: Change files to a delegate that accepts the module
module.exports = [
    {
        description: 'Default rules',
        config: `${folders.tools}tslint/default.json`,
        files: [].concat(
            `${folders.modules}**/*.ts`
        )
    }
];
