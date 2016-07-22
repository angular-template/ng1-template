let folders = require('./core.folders');

let styles = {};

styles.injections = [
    `${folders.devBuildStyles}**/*.css`
];

module.exports = styles;
