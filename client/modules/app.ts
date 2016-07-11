/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../typings/app.d.ts" />

namespace app {
    export const appModule: angular.IModule = angular.module('app', [
        /* App modules */
        'demo',
        'security',
        'common',
        'ngTemplate.core',

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

    export interface IComponentDefinition {
        name: string;
        controller: angular.IComponentController;
        templateUrl: string;
        bindings?: { [binding: string]: string };
        route?: IComponentRoute;
    }

    export interface IComponentRoute {
        url: string;
        resolve?: Dictionary;
        abstract?: boolean;
        parent?: string | IComponentDefinition;
    }

    export function registerComponent(
        definition: IComponentDefinition,
        module: angular.IModule,
        templateUrlRoot?: string
    ) {
        let finalTemplateUrlRoot: string = templateUrlRoot || `/client/modules/${module.name}/`;
        module.component(_.camelCase(definition.name), {
            templateUrl: `${finalTemplateUrlRoot}${definition.templateUrl}`,
            controller: definition.controller,
            controllerAs: _.camelCase(definition.name),
            bindings: definition.bindings
        });

        if (definition.route) {
            let route: IComponentRoute = definition.route;
            module.config(['$stateProvider',
                function ($stateProvider: ng.ui.IStateProvider) {
                    let state: ng.ui.IState = {
                        name: definition.name,
                        template: `<${definition.name}></${definition.name}>`,
                        url: route.url,
                        resolve: route.resolve,
                    };
                    if (route.abstract !== undefined) {
                        state.abstract = route.abstract;
                    }
                    if (route.parent) {
                        let parent: string | IComponentDefinition = route.parent;
                        if (typeof parent === 'string') {
                            state.parent = parent;
                        } else {
                            state.parent = parent.name;
                        }
                    }
                    $stateProvider.state(state);
                }
            ]);
        }
    }
}

function Component(details: {
    selector: string,
    templateUrl: string,
    route?: app.IComponentRoute
}, module: ng.IModule, templateUrlRoot?: string) {
    return function(target: Object) {
        let bindings: { [binding: string]: string } = target['bindings'] ? {} : undefined;
        if (bindings) {
            for (let b in target['bindings']) {
                if (target['bindings'].hasOwnProperty(b)) {
                    bindings[b] = target['bindings'][b];
                }
            }
        }
        app.registerComponent({
            name: details.selector,
            controller: target,
            templateUrl: details.templateUrl,
            bindings: bindings,
            route: details.route
        }, module, templateUrlRoot);
    }
}

function Layout(details: {
    name: string,
    templateUrl: string,
    module: ng.IModule,
    templateUrlRoot?: string
}) {
    return function(target: Function) {
        app.registerComponent({
            name: details.name,
            controller: target,
            templateUrl: details.templateUrl,
            route: {
                abstract: true,
                url: '^'
            }
        }, details.module, details.templateUrlRoot);
    }
}

namespace binding {
    export function oneWay() {
        return function (target: Object, key: string) {
            if (!target.constructor['bindings']) {
                target.constructor['bindings'] = {};
            }
            target.constructor['bindings'][key] = '<';
        }
    }

    export function twoWay() {
        return function (target: Object, key: string) {
            if (!target.constructor['bindings']) {
                target.constructor['bindings'] = {};
            }
            target.constructor['bindings'][key] = '=';
        }
    }

    export function string() {
        return function (target: Object, key: string) {
            if (!target.constructor['bindings']) {
                target.constructor['bindings'] = {};
            }
            target.constructor['bindings'][key] = '@';
        }
    }

    export function event() {
        return function (target: Object, key: string) {
            if (!target.constructor['bindings']) {
                target.constructor['bindings'] = {};
            }
            target.constructor['bindings'][key] = '&';
        }
    }
}
