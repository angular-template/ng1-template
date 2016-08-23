'use strict';

/*** DO NOT MODIFY THIS FILE ***/

let gulp = require('gulp');

/**
 * Load the default configuration from the ng1-template-gulp package.
 */
let ng1TemplateGulp = require('ng1-template-gulp');
let config = ng1TemplateGulp.config;
let utils = ng1TemplateGulp.utils;

/**
 * Once the config is loaded from the ng1-template-gulp package, call the local gulp.config module
 * to customize the config as per the project requirements.
 */
utils.compileTsFile('./gulp.config.ts', config.folders.build);
require(`${config.folders.build}gulp.config`)(config);

/**
 * Load the contents of local .json files. This cannot be done from the ng1-template-gulp package,
 * as the config.folders values will not be correct, so it has to be done from the gulpfile.js.
 */

// Load the bower.json file contents.
config.options.bowerJson = require(`${config.folders.root}bower.json`);
