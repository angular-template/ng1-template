let folders = require('./core.folders');
let utils = require('./core.utils');

let securityModule = utils.createModule('security');
let commonModule = utils.createModule('common');
let demoModule = utils.createModule('demo', {
    jsToInject: [
        'layouts/**/*.js',
        '**/*.js'
    ],
    cssToCopy: [
        'layouts/sample/normalize.css',
        'layouts/sample/skeleton.css',
        'home/home.css'
    ]
});

module.exports = {
    //Specify modules in increasing order of dependencies.
    modules: [
        commonModule,
        securityModule,
        demoModule
    ],
    coreDependencies: [
        'ng1Template.core',
        'ngSanitize',
        'ngAnimate',
        'ngMessages',
        'ngAria',
        'ui.router',
    ]
};
