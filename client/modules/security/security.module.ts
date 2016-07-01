/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../typings/app.d.ts" />

namespace security {
    export const securityModule: angular.IModule = angular.module('security', [
        /* App modules */
        'common',
    ]);

    export function registerController(controllerConstructor: Function, route: IPageState, ...secondaryRoutes: IPageState[]): angular.IModule {
        return registerControllers(controllerConstructor, route, secondaryRoutes, securityModule);
    }
}
