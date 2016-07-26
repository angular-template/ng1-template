'use strict';

let gulp = require('gulp');
let $ = require('gulp-load-plugins')({lazy: true});

let tsks = require('./task-names');
let utils = require('./utils');

let folders = require('../config/core.folders');

gulp.task(tsks.help, $.taskListing.withFilters(/(_|:)/, task => task === tsks.default || task === tsks.help));

gulp.task(tsks.default, [tsks.dev.serve]);

gulp.task('clean', [tsks.dist.clean, tsks.dev.clean], done => {
    utils.clean(folders.build, done);
});
