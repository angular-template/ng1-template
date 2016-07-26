'use strict';

let folders = require('./core.folders');

let styles = {
    /**
     * Set to true if LESS files are used by your application.
     */
    usesLess: false,

    /**
     * Set to true if SASS files are used by your applications.
     */
    usesSass: false
};

/**
 * Array specifying all the CSS files to be injected into index.html.
 *
 * This can include:
 * 1. 3rd-party styles from Bower components (use the variable folder.bower)
 * 2. Application styles, including those compiled from LESS or SASS, which are all available in
 *    the folders.devBuildStyles folder.
 *
 * The array contents should be listed in the order that they need to be injected into index.html.
 */
styles.injections = [
    `${folders.devBuildStyles}**/*.css`,
    `${folders.assets}**/*.css`,
    `${folders.modules}**/*.css`
];

/**
 * CSS files that are part of the application. Order does not matter.
 * Typically, these files will be located under the client/assets folder.
 *
 * Note: This array should not specify CSS files under the module subfolders. These will be
 * specified as part of the module declarations.
 *
 * Default is all the .css files under the ${folders.assets}css folder.
 */
styles.css = [
    `${folders.assets}css/**/*.css`
];

/**
 * LESS files that are part of the application.
 * Typically, these files will be located under the client/assets folder.
 *
 * Note: This array should not specify LESS files under the module subfolders. These will be
 * specified as part of the module declarations.
 *
 * Default is a single file ${folders.assets}less/styles.less
 */
styles.less = [
    `${folders.assets}less/styles.less`
];

/**
 * SASS files that are part of the application.
 * Typically, these files will be located under the client/assets folder.
 *
 * Note: This array should not specify SASS files under the module subfolders. These will be
 * specified as part of the module declarations.
 *
 * Default is a single file ${folders.assets}sass/styles.scss
 */
styles.sass = [
    `${folders.assets}sass/styles.scss`
];

module.exports = styles;
