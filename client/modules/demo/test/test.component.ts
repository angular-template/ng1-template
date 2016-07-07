/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace demo.test {
    export class TestController implements angular.IComponentController {
        public message: string = 'My Message from Class';

        public $onInit(): void {
            this.message = 'New Message from Class';
        }
    }

    demoModule.component('test', {
        templateUrl: '/client/modules/demo/test/test.html',
        bindings: {
            value: '<',
        },
        controller: TestController,
        controllerAs: 'test',
    });
}
