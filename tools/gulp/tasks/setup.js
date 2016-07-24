'use strict';

let gulp = require('gulp');
let $ = require('gulp-load-plugins')({lazy: true});

let utils = require('./utils');

gulp.task('setup', () => {
    utils.log('Creating GIT hooks.');
    return gulp.src('./.pre-commit')
        .pipe($.symlink('./.git/hooks/pre-commit', {force: true}));
});
