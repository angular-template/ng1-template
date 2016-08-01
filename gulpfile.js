'use strict';

/*** DO NOT MODIFY THIS FILE ***/

let gulp = require('gulp');

/**
 * Load the default configuration from the ng1-template-gulp package.
 */
let ng1TemplateGulp = require('ng1-template-gulp');
let config = ng1TemplateGulp.config;

/**
 * Once the config is loaded from the ng1-template-gulp package, call the local gulp.config module
 * to customize the config as per the project requirements.
 */
compileGulpConfig();
require('./.build/gulp.config')(config);

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

/**
 * Compile the gulp.config.ts file
 */
function compileGulpConfig() {
    let typescript = require('typescript');

    let program = typescript.createProgram(['./gulp.config.ts'], {
        noEmitOnError: true,
        target: typescript.ScriptTarget.ES5,
        module: typescript.ModuleKind.CommonJS,
        outDir: './.build/',
        removeComments: true
    });
    let emitResult = program.emit();

    let allDiagnostics = typescript
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);

    // allDiagnostics.forEach(diagnostic => {
    //     let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
    //     let message = typescript.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    //     console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    // });
}