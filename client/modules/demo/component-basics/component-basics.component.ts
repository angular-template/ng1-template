/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="../../../../typings/app.d.ts"/>

namespace demo.componentBasics {
    @Component({
        selector: 'component-basics'
    }, demoModule)
    export class ComponentBasicsComponent implements ng.IComponentController {
        public static route: ng1Template.core.IComponentRoute = {
            path: '/demo/component-basics',
            parent: 'sample-layout'
        };
    }
}
