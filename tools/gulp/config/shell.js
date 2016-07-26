'use strict';

let folders = require('./core.folders');

let folder = folders.client;
let fileName = 'index.html';

module.exports = {
    folder: folder,
    fileName: fileName,
    file: `${folder}${fileName}`,
    template: `${folders.tools}templates/index.html.template`
}
