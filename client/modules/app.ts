/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../typings/app.d.ts" />

namespace app {
    export const appModule: angular.IModule = angular.module('app', [
        /* App modules */
        'demo',
        'security',
        'common',
        'ng1Template.core',

        /* Angular modules */
        'ngSanitize',
        'ngAnimate',
        'ngMessages',
        'ngAria',

        /* Angular-UI modules */
        'ui.router'
    ]);

    appModule.component('app', {
        template: '<div ui-view></div>'
    });
}
