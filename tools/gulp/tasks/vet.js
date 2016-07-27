'use strict';

let gulp = require('gulp');
let sequence = require('run-sequence');
let args = require('yargs').argv;
let $ = require('gulp-load-plugins')({lazy: true});

let tsks = require('./task-names');
let utils = require('./utils');

let folders = require('../config/core.folders');
let options = require('../config/npm-options');
let styles = require('../config/styles');
let typings = require('../config/typings');
let tslint = require('../config/tslint');

let failOnVetError = args.failOnVetError;

gulp.task(tsks.vet.vet, done => {
    utils.log('Vetting application code');
    let tasks = [tsks.definitions.generate,
        'generate_modules',
        tsks.vet._compileTs, tsks.vet._lintTs];
    if (styles.usesLess) {
        tasks.push(tsks.vet._compileLess);
    }
    tasks.push(done);
    sequence.apply(this, tasks);
});

gulp.task(tsks.vet._compileTs, () => {
    utils.log2('[Vet] Compiling Typescript files');
    let filesToCompile = [].concat(
        typings.all,
        `${folders.modules}**/*.ts`
    );
    let tsOptions = options.typescriptVet;
    tsOptions.noEmitOnError = !failOnVetError;
    return gulp.src(filesToCompile)
        .pipe($.typescript(tsOptions));
});

let tslintIndex = 0;
gulp.task(tsks.vet._lintTs, done => {
    tslintIndex = 0;
    let tasks = [];
    for (let i = 0; i < tslint.length; i++) {
        tasks.push(tsks.vet._lintTsCopyConfig);
        tasks.push(tsks.vet._lintTsRun);
        tasks.push(tsks.vet._lintTsIncrementCounter);
    }
    tasks.push(done);
    sequence.apply(this, tasks);
});

/* Copies the tslint file specified in config from the tools/tslint folder to the root and renames
   it to tslint.json. */
gulp.task(tsks.vet._lintTsCopyConfig, () =>
    gulp.src(tslint[tslintIndex].config)
        .pipe($.rename('tslint.json'))
        .pipe(gulp.dest(folders.root))
);

gulp.task(tsks.vet._lintTsRun, () => {
    utils.log(tslint[tslintIndex].description, $.util.colors.yellow.bgBlack);
    return gulp.src(tslint[tslintIndex].files)
        .pipe($.tslint({
            formatter: 'verbose'
        }))
        .pipe($.tslint.report({
            emitError: failOnVetError,
            bell: true
        }));
});

gulp.task(tsks.vet._lintTsIncrementCounter, done => {
    tslintIndex += 1;
    utils.clean(`${folders.root}tslint.json`, done);
});

gulp.task(tsks.vet._compileLess, () => {
    utils.log2('[Vet] Compiling LESS files');
    let lessFiles = modules.reduce(
        (files, mod) => files.concat(mod.styles.less || []),
        styles.less || []
    );
    return gulp.src(lessFiles)
        .pipe($.less());
});

gulp.task(tsks.vet._lintLess, () => {
    utils.log2('[Vet] Linting LESS files');
    let lessToLint = modules.reduce((files, mod) => files.concat(mod.lessToLint), []);
    return gulp.src(lessToLint)
        .pipe($.lesshint());
});
