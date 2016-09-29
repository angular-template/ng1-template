/// <reference path="../../../../../typings/index.d.ts"/>
/// <reference path="../../../../../typings/app.d.ts"/>

namespace common.layouts.main {
    export const name: string = 'main-layout';

    @Layout({
        name: name,
        templateUrl: 'layouts/main/main.html'
    })
    export class MainLayout implements ng.IComponentController {
    }
}
