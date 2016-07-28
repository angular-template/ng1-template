'use strict';

let utils = require('ng1-template-gulp').utils;

module.exports = function(config) {
    config.modules.push(utils.createModule('security'));
    config.modules.push(utils.createModule('demo', {
        jsToInject: [
            'layouts/**/*.js',
            '**/*.js'
        ]
    }));
};
