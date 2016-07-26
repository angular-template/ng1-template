/// <reference path="../../../../../../typings/index.d.ts"/>
/// <reference path="../../../../../../typings/app.d.ts"/>

namespace demo.layouts.sample.footerSection {
    @Component({
        selector: 'footer-section',
        templateUrl: 'layouts/sample/footer-section/footer-section.html'
    })
    export class FooterSection implements ng.IComponentController {
        /* @ngInject */
        constructor(config: app.IConfig) {
            this.env = config.name || 'Production';
        }

        public env: string;

        @bind.string()
        public yearRange: string;

        @bind.oneWay()
        public company: string;
    }
}
