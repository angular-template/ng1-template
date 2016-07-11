namespace demo {
    export const demoModule: angular.IModule = angular.module('demo', [
        'common',
        'ng1Template.core',

        /* Angular modules */
        'ngSanitize',
        'ngAnimate',
        'ngMessages',
        'ngAria',

        /* Angular-UI modules */
        'ui.router',
    ]);
}
