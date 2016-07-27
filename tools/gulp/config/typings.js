'use strict';

let folders = require('./core.folders');

const appTypingsFileName = 'app.d.ts';
const appTypingsFile = `${folders.typings}${appTypingsFileName}`;
const typingFiles = [
    `${folders.typings}index.d.ts`,
    appTypingsFile
];

module.exports = {
    //File name of the definition file for application files.
    appFileName: appTypingsFileName,

    //Path to the definition file for application files.
    appFile: appTypingsFile,

    //Empty template of the definition file for application files.
    //Contains only the necessary placeholders for the injector.
    appTemplate: `${folders.tools}templates/app.d.ts.template`,

    //List of all definition files (application, bower, etc.)
    all: typingFiles
};
