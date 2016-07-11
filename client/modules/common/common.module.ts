/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../typings/app.d.ts" />

namespace common {
    export const commonModule: angular.IModule = angular.module('common', [
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
