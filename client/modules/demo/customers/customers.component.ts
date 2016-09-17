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
            this.$log.log(this.theDataVo, this.customers);
        }

        @resolver(['customersWebService'])
        public resolveCustomers(customersWebService: ws.CustomersWebService): wsModels.Customer[] {
            return customersWebService.getCustomers();
        }

        @resolved
        public customers: wsModels.Customer[];

        @resolver()
        public resolveTheDataVo(): string {
            return `The data is `;
        }

        @resolved
        public theDataVo: string;
    }
}
