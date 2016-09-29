'use strict';

/*** DO NOT MODIFY THIS SECTION ***/

let gulp = require('gulp');

let ng1TemplateGulp = require('ng1-template-gulp');
let config = ng1TemplateGulp.config;
let utils = ng1TemplateGulp.utils;

utils.compileTsFile('./gulp.config.ts', config.folders.build);
require(`${config.folders.build}gulp.config`)(config);

config.options.bowerJson = require(`${config.folders.root}bower.json`);

/*** ADD CUSTOM GULP TASKS BELOW ***/
/* Access the configuration using the config variable. */
/* Access utility function using the utils variable.   */
