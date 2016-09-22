/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="../../../../typings/app.d.ts"/>

namespace common.welcome {
    export const name: string = 'welcome';

    @Component({
        selector: name
    }, {
        path: '/welcome',
        parent: layouts.main.name
    })
    export class WelcomePage implements ng.IComponentController {

    }
}
