/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../typings/app.d.ts" />

namespace demo {
    import core = ng1Template.core;

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

    // tslint:disable-next-line:variable-name
    export let Component: core.ComponentDecoratorFactory = (
        details: core.IComponentDetails, route?: core.IComponentRoute
    ): core.ClassDecorator => {
        return (target: Function): void => {
            core.registerComponent({
                name: details.selector,
                controller: target,
                templateUrl: details.templateUrl,
                templateUrlRoot: details.templateUrlRoot,
                route: route
            }, demoModule);
        };
    };

    // tslint:disable-next-line:variable-name
    export let Layout: core.LayoutDecoratorFactory = (details: core.ILayoutDetails): core.ClassDecorator => {
        return (target: Function): void => {
            core.registerLayout({
                name: details.name,
                controller: target,
                templateUrl: details.templateUrl,
                templateUrlRoot: details.templateUrlRoot
            }, demoModule);
        };
    };

    // tslint:disable-next-line:variable-name
    export let Injectable: core.InjectorDecoratorFactory = (): core.ClassDecorator => {
        return (target: Function): void => {
            core.registerService({
                service: target,
                module: demoModule
            });
        };
    };
}
