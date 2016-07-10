/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace demo.test {
    export interface ITestBindings {
        theValue: string;
    }

    export class TestController implements angular.IComponentController, ITestBindings {
        public $onInit(): void {
            alert(this.theValue);
        }

        public theValue: string;

        public message(): string {
            return 'New Message from Class' + this.theValue;
        }
    }

    app.registerComponent({
        name: 'test',
        templateUrl: 'test/test.html',
        controller: TestController,
        bindings: {
            theValue: '<',
        },
    }, demoModule);

    // demoModule.component('test', {
    //     templateUrl: '/client/modules/demo/test/test.html',
    //     controller: TestController,
    //     controllerAs: 'test',
    //     bindings: {
    //         theValue: '<'
    //     }
    // })
}
