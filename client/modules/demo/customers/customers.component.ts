/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="../../../../typings/app.d.ts"/>

namespace demo.customers {
    import ws = common.webservices;
    import wsModels = common.webservices.models;

    export const name: string = 'customers';

    @Component({
        selector: name
    }, {
        path: '/demos/customers',
        parent: demo.layouts.sample.name
    })
    export class CustomersComponent implements ng.IComponentController {
        /* @ngInject */
        constructor(private customersWebService: ws.CustomersWebService, private $log: ng.ILogService) {
        }

        public $onInit(): void {
            // this.$log.log(this.count, this.test, this.customers);
            this.$log.log(this.theData);
            // this.customers = this.customersWebService.getCustomers();
        }

        // @resolved
        // public customers: wsModels.Customer[];

        // @resolved
        // public count: number;

        // @resolved
        // public test: string;

        @resolver()
        public resolveTheData(): string {
            return `The data is `;
        }

        @resolved
        public theData: number;

        public callFunc() {
            this.$log.log(this);
        }
    }
}
