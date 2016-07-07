/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace demo.home2 {
    export class Home2Component implements angular.IComponentController {
        public testValue: string = 'Home 2';
    }

    demoModule.component('home2', {
        templateUrl: '/client/modules/demo/home2/home2.html',
        controller: Home2Component,
        controllerAs: 'home2',
    });

    demoModule.config(['$stateProvider',
        ($stateProvider: angular.ui.IStateProvider): void => {
            $stateProvider.state('home2', {
                url: '/demos/home2',
                template: '<home2></home2>',
            });
        },
    ]);
}
