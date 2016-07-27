/// <reference path="../../../../../typings/index.d.ts"/>
/// <reference path="../../../../../typings/app.d.ts"/>

namespace demo.componentBasics.childComponent {
    export const name: string = 'child-component';

    @Component({
        selector: name,
        templateUrl: 'component-basics/child-component/child-component.html'
    })
    export class ChildComponentComponent implements ng.IComponentController {
        @bind.oneWay()
        public oneWay: string;

        @bind.twoWay()
        public twoWay: string;
    }
}
