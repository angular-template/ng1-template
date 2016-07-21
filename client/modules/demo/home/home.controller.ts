/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="../../../../typings/app.d.ts"/>

namespace demo.home {
    export const name: string = 'home';

    @Component({
        selector: name
    }, demoModule)
    export class HomeComponent implements ng.IComponentController {
        public static route: ng1Template.core.IComponentRoute = {
            path: '/',
            parent: layouts.sample.name
        };
    }
}
