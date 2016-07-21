/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../typings/app.d.ts" />

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

    type ClassDecoratorResult = (target: Function) => void;
    type ClassDecoratorFunction = () => ClassDecoratorResult;

    // tslint:disable-next-line:variable-name
    export let Injectable: ClassDecoratorFunction = (): ClassDecoratorResult => {
        return (target: Function): void => {
            demoModule.service(_.camelCase(target['name']), target);
        };
    };
}
