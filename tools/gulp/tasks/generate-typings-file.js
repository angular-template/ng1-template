'use strict';

let gulp = require('gulp');
let sequence = require('run-sequence');
let $ = require('gulp-load-plugins')({lazy: true});

let tsks = require('./task-names');
let utils = require('./utils');

let folders = require('../config/core.folders');
let modules = require('../config/modules').modules;
let typings = require('../config/typings');

gulp.task(tsks.definitions.generate, done => {
    utils.log(`Generating a single Typescript definition file (${typings.appFileName}) for all custom Typescript files.`);
    sequence(tsks.definitions.deleteFile,
        tsks.definitions.copyTemplate,
        tsks.definitions.inject,
        done);
});

gulp.task(tsks.definitions.deleteFile, done => {
    utils.clean(typings.appFile, done);
});

gulp.task(tsks.definitions.copyTemplate, () =>
    gulp.src(typings.appTemplate)
        .pipe($.rename(typings.appFileName))
        .pipe(gulp.dest(folders.typings))
);

gulp.task(tsks.definitions.inject, () => {
    let tsFiles = [`${folders.modules}**/*.ts`];
    let tsFilesSrc = gulp.src(tsFiles, {read: false});
    return gulp.src(typings.appFile)
        .pipe($.inject(tsFilesSrc, {
            starttag: '//{',
            endtag: '//}',
            transform: filePath => `/// <reference path="..${filePath}" />`
        }))
        .pipe(gulp.dest(folders.typings));
});
