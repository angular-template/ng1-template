/// <reference path="../../../../../../typings/index.d.ts"/>
/// <reference path="../../../../../../typings/app.d.ts"/>

namespace demo.layouts.sample.headerSection {
    @Component({
        selector: 'header-section',
        templateUrl: 'layouts/sample/header-section/header-section.html'
    })
    export class HeaderSection implements ng.IComponentController {
        @bind.oneWay()
        public product: string;

        @bind.oneWay()
        public company: string;
    }
}
