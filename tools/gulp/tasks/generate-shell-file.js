'use strict';

let gulp = require('gulp');
let sequence = require('run-sequence');
let $ = require('gulp-load-plugins')({lazy: true});

let tsks = require('./task-names');
let utils = require('./utils');

let config = require('../config/index');
let folders = require('../config/core.folders');
let modules = require('../config/modules');

/* Creates a fresh index.html file from the index.html.template.
   By doing this, we do not have to have index.html in version control, so the constant changes to
   it due to the inject tasks can be ignored. */
gulp.task(tsks.shell.generate, done => {
    utils.log('Generating the index.html shell file.');
    sequence(tsks.shell.deleteFile, tsks.shell.copyTemplate, done);
});

gulp.task(tsks.shell.deleteFile, done => {
    utils.clean(config.shell, done);
});

gulp.task(tsks.shell.copyTemplate, () => {
    let modulePlaceholders = getModulePlaceholders();
    return gulp.src(`${folders.client}index.html.template`)
        .pipe($.injectString.replace('<!-- custom-modules -->', modulePlaceholders))
        .pipe($.rename('index.html'))
        .pipe(gulp.dest(folders.client))
});

function getModulePlaceholders() {
    return config.modules.reduce((ph, mod) =>
        ph + `    <!-- build:js js/${mod.name}.js -->\r\n` +
            `    <!-- inject:${mod.name}:js -->\r\n` +
            `    <!-- endinject -->\r\n` +
            `    <!-- inject:${mod.name}-templates:js -->\r\n` +
            `    <!-- endinject -->\r\n` +
            `    <!-- endbuild -->\r\n\r\n`, '');
}
