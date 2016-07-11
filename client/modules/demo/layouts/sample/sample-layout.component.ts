/// <reference path="../../../../../typings/index.d.ts"/>
/// <reference path="../../../../../typings/app.d.ts"/>

namespace demo.layouts.sample {
    @Layout({
        name: 'sample-layout',
        templateUrl: 'layouts/sample/sample-layout.html',
    }, demoModule)
    export class SampleLayoutComponent implements ng.IComponentController {
    }
}
