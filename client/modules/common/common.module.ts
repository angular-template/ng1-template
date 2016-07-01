/// <reference path="../../../typings/lib.d.ts" />
/// <reference path="../../../typings/app.d.ts" />

namespace common {
    export const commonModule: angular.IModule = angular.module('common', [
        'ngTemplate.core',

        /* Angular modules */
        'ngSanitize',
        'ngAnimate',
        'ngMessages',
        'ngAria',

        /* Angular-UI modules */
        'ui.router',
    ]);

    export function registerController(
        controllerConstructor: Function,
        route: IPageState,
        ...secondaryRoutes: IPageState[]): angular.IModule {
        return registerControllers(controllerConstructor, route, secondaryRoutes, commonModule);
    }
}
