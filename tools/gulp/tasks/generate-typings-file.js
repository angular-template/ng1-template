'use strict';

let gulp = require('gulp');
let sequence = require('run-sequence');
let $ = require('gulp-load-plugins')({lazy: true});

let tsks = require('./task-names');
let utils = require('./utils');

let config = require('../config/index');
let folders = require('../config/core.folders');
let modules = require('../config/modules').modules;

gulp.task(tsks.definitions.generate, done => {
    utils.log(`Generating a single Typescript definition file (${config.definitions.appFileName}) for all custom Typescript files.`);
    sequence(tsks.definitions.deleteFile,
        tsks.definitions.copyTemplate,
        tsks.definitions.inject,
        done);
});

gulp.task(tsks.definitions.deleteFile, done => {
    utils.clean(config.definitions.appFile, done);
});

gulp.task(tsks.definitions.copyTemplate, () =>
    gulp.src(config.definitions.appTemplate)
        .pipe($.rename(config.definitions.appFileName))
        .pipe(gulp.dest(folders.typings))
);

gulp.task(tsks.definitions.inject, () => {
    let tsFiles = [`${folders.modules}**/*.ts`];
    let tsFilesSrc = gulp.src(tsFiles, {read: false});
    return gulp.src(config.definitions.appFile)
        .pipe($.inject(tsFilesSrc, {
            starttag: '//{',
            endtag: '//}',
            transform: filePath => `/// <reference path="..${filePath}" />`
        }))
        .pipe(gulp.dest(folders.typings));
});
