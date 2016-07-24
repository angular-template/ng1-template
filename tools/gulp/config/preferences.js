'use strict';

module.exports = {
    // Throws an exception if the vet task fails.
    // Useful when used in continuous integration scenarios, to cause the process to fail.
    failOnVetError: false,

    // Runs the vet before each dev build.
    // Useful when you don't have any alternate process to vet code before committing to source control.
    vetBeforeDevBuild: false
};
