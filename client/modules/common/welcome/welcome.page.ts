/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="../../../../typings/app.d.ts"/>

namespace common.welcome {
    export const name: string = 'welcome';

    @Page({
        selector: name
    }, {
        path: '/',
        parent: layouts.main.name
    })
    export class WelcomePage implements ng.IComponentController {
    }
}
