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

// Load the rev-manifest.json that is created as part of the dist build.
// This needs to be done as a Gulp task, as the rev-manifest.json file is created during the build
// process, and so cannot be loaded on startup.
// The rename_rev_shell task from the ng1-template-gulp package uses this task as a dependency.
gulp.task('load_rev_manifest', done => {
    config.revManifest = require(`${config.folders.distBuild}rev-manifest.json`);
    done();
});

gulp.task('build-output', done => {
    let fs = require('fs');
    let contents = fs.readFileSync('./.build/.dist/index.html', 'utf8');
    console.log(contents);
});

gulp.task('test-build', done => {
    utils.log('Building the distribution deployment of the application.');

    let tsks = utils.taskNames;
    require('run-sequence')(
        tsks.dist.clean,
        tsks.dev.build,
        'create_env_configs',
        'copy_to_dist',
        'inject_ng_templates',
        'my_optimize_build',
        done);
});

gulp.task('my_optimize_build', () => {
    utils.log('[MINE] Performing optimization for dist - bundling, minification and cache busting.');

    // let $ = require('gulp-load-plugins')({lazy: true});
    let useref = require('gulp-useref');
    let gulpif = require('gulp-if');
    let uglify = require('gulp-uglify');
    let csso = require('gulp-csso');
    let debug = require('gulp-debug');
    let rev = require('gulp-rev');
    let revReplace = require('gulp-rev-replace');
    let stripLine = require('gulp-strip-line');

    function revoutput(file) {
        return file.path.length > 5 && file.path.substr(file.path.length - '.html'.length).toLowerCase() !== '.html';
    }

    return gulp.src(config.shell.file)
        .pipe(stripLine(`<!-- inject`))
        .pipe(useref({searchPath: './'}))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', csso()))
        .pipe(debug({title: 'after-useref'}))
        //.pipe(gulpif(revoutput, rev()))
        //.pipe(revReplace())
        .pipe(gulp.dest(config.folders.distBuild));
});
