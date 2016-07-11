/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace demo.test {
    export interface ITestBindings {
        theValue: string;
    }

    @Component({
        selector: 'test',
        templateUrl: 'test/test.html'
    }, demoModule)
    export class TestController implements angular.IComponentController, ITestBindings {
        @binding.oneWay()
        public theValue: string;

        @binding.event()
        public display: () => void;

        public displayValue() {
            if (this.display) {
                this.display();
            }
        }

        public message(): string {
            return 'New Message from Class' + this.theValue;
        }
    }
}
