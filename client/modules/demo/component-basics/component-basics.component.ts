/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="../../../../typings/app.d.ts"/>

namespace demo.componentBasics {
    @Component({
        selector: 'component-basics',
        route: {
            path: '/demo/component-basics',
            parent: 'sample-layout'
        }
    }, demoModule)
    export class ComponentBasicsComponent implements ng.IComponentController {

    }
}
