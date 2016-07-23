/**
 * @description
 * Define the modules in the application. Each module is a folder under the client/modules folder
 * that represents an Angular module and has its own scripts, styles and static assets.
 *
 * Use the createModule function from the core.utils module to create modules. This function will
 * create a module object with default values based on the module name specified. You can override
 * or add extra values by using the second parameter.
 *
 * The list of modules are specified in an array in increasing order of dependencies. i.e. the
 * first module will have no dependencies on any other modules in the application, while the last
 * module will depend on every other module in the application.
 *
 * Also define the core dependencies. These are the dependencies that every module will depend on.
 *
 * Note: If the module has additional dependencies you'd like to add, you can specify them in the
 * module object's dependencies property.
 */

let folders = require('./core.folders');
let utils = require('./core.utils');

let commonModule = utils.createModule('common');
let securityModule = utils.createModule('security');
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
