/// <reference path="../../../../../../typings/index.d.ts"/>
/// <reference path="../../../../../../typings/app.d.ts"/>

namespace demo.layouts.sample.footerSection {
    @Component({
        selector: 'footer-section',
        templateUrl: 'layouts/sample/footer-section/footer-section.html'
    })
    export class FooterSection implements ng.IComponentController {
        @bind.string()
        public yearRange: string;

        @bind.oneWay()
        public company: string;
    }
}
