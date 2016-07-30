'use strict';

let utils = require('ng1-template-gulp').utils;

module.exports = function(config) {
    /**
     * Create all application modules and add them to the config.modules array in increasing order
     * of their dependencies to one another.
     * The common module is added by default, so you do not need to add it if it's needed. If it is
     * not needed, you'll need to remove it first.
     */
    config.modules.push(utils.createModule('security'));
    config.modules.push(utils.createModule('demo'));

    // Add your project-specific configurations by adding to or modifying the config object.
};
