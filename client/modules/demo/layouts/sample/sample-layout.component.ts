/// <reference path="../../../../../typings/index.d.ts"/>
/// <reference path="../../../../../typings/app.d.ts"/>

namespace demo.layouts.sample {
    @Layout({
        name: 'sample-layout',
        templateUrl: 'layouts/sample/sample-layout.html',
        module: demoModule,
    })
    export class SampleLayoutComponent implements ng.IComponentController {
    }

    export const component: app.IComponentDefinition = {
        name: 'sample-layout',
        templateUrl: 'layouts/sample/sample-layout.html',
        controller: SampleLayoutComponent,
        route: {
            abstract: true,
            url: '^',
        },
    };

    // app.registerComponent(component, demoModule);
}
