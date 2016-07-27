/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="../../../../typings/app.d.ts"/>

namespace demo.componentBasics {
    export const name: string = 'component-basics';

    @Component({
        selector: name
    }, {
            path: '/demo/component-basics',
            parent: layouts.sample.name
        })
    export class ComponentBasicsComponent implements ng.IComponentController {
        public oneWay: string;
        public twoWay: string;
    }
}
