/// <reference path="../../../../../typings/index.d.ts"/>
/// <reference path="../../../../../typings/app.d.ts"/>

namespace demo.layouts.sample {
    export const name: string = 'sample-layout';

    @Layout({
        name: name,
        templateUrl: 'layouts/sample/sample-layout.html',
    })
    export class SampleLayoutComponent implements ng.IComponentController {
        /* @ngInject */
        constructor(private sampleLayoutService: SampleLayoutService) {
        }

        public $onInit(): void {
            this.menuItems = this.sampleLayoutService.getMenuItems();
        }

        public menuItems: MenuItems;

        public company: string = 'Angular Template Inc.';

        public product: string = 'Angular 1.5 Template Demo';
    }
}
