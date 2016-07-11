/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace demo.test {
    export interface ITestBindings {
        theValue: string;
    }

    @Component({
        selector: 'test',
        templateUrl: 'test/test.html',
        bindings: {
            theValue: '<'
        }
    }, demoModule)
    export class TestController implements angular.IComponentController, ITestBindings {
        public $onInit(): void {
            alert(this.theValue);
        }

        public theValue: string;

        public message(): string {
            return 'New Message from Class' + this.theValue;
        }
    }
}
