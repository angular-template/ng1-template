/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="../../../../typings/app.d.ts"/>

namespace route {
}

namespace demo.home {
    export const name: string = 'home';

    @Component({
        selector: name
    }, {
            path: '/home/:userId?my-pref',
            parent: layouts.sample.name
        })
    export class HomeComponent implements ng.IComponentController {
        /* @ngInject */
        constructor(private $log: ng.ILogService) {
        }

        public $onInit(): void {
            this.$log.log(this.routeParams, this.userId, this.pref);
        }

        @route.multiple({
            userId: 'string',
            '?my-pref': 'string'
        })
        public routeParams: {
            userId: string;
            myPref: string;
        };

        @route.param('boolean')
        public userId: boolean;

        @route.query('string', 'my-pref')
        public pref: string;
    }
}
