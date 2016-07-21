/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="../../../../typings/app.d.ts"/>

namespace demo.componentBasics {
    export const name: string = 'component-basics';

    @Component({
        selector: name
    }, demoModule)
    export class ComponentBasicsComponent implements ng.IComponentController {
        public static route: ng1Template.core.IComponentRoute = {
            path: '/demo/component-basics',
            parent: 'sample-layout'
        };
    }
}
