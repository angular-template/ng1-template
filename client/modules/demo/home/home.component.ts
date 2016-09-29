/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="../../../../typings/app.d.ts"/>

namespace demo.home {
    export const name: string = 'home';

    @Component({
        selector: name
    }, {
            path: '/',
            parent: layouts.sample.name
        })
    export class HomeComponent implements ng.IComponentController {
    }
}
