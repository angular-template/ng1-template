'use strict';

let folders = require('./core.folders');

//TODO: No need for customHostPort any more.
//TODO: Review the watch value
module.exports = {
    entryPoint: `${folders.server}server.js`,
    watch: folders.server,
    nodeHostPort: 7709,
    customHostPort: 7710
}
