/// <reference path="./node_modules/ng1-template-gulp/typings/gulp.config.d.ts"/>

'use strict';

let utils: IUtils = require('ng1-template-gulp').utils;

module.exports = function(config: IConfig) {
    /**
     * The following variables represent aspects of the default configuration.
     * If you are changing any existing values in the default config, update or delete the variables accordingly.
     */
    let commonModule: IModule = config.modules[0];

    /**
     * Create all application modules and add them to the config.modules array in increasing order
     * of their dependencies to one another.
     * The common module is added by default, so you do not need to add it if it's needed. If it is
     * not needed, you'll need to remove it first.
     */

    // Add your project-specific configurations by adding to or modifying the config object.
};
