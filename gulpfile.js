'use strict';

/*** DO NOT MODIFY THIS FILE ***/

let gulp = require('gulp');

let ng1TemplateGulp = require('ng1-template-gulp');
let config = ng1TemplateGulp.config;

/**
 * Once the config is loaded from the ng1-template-gulp package, call the local gulp.config module
 * to customize the config as per the project requirements.
 */
require('./gulp.config')(config);

/**
 * Load the contents of local .json files. This cannot be done from the ng1-template-gulp package,
 * as the config.folders values will not be correct, so it has to be done from the gulpfile.js.
 */

// Load the bower.json file contents.
config.options.bowerJson = require(`${config.folders.root}bower.json`);

// Load the rev-manifest.json that is created as part of the dist build.
// This needs to be done as a Gulp task, as the rev-manifest.json file is created during the build
// process, and so cannot be loaded on startup.
// The rename_rev_shell task from the ng1-template-gulp package uses this task as a dependency.
gulp.task('load_rev_manifest', done => {
    config.revManifest = require(`${config.folders.distBuild}rev-manifest.json`);
    done();
});
