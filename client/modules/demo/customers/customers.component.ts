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
        constructor(private customersWebService: ws.CustomersWebService) {
        }

        public $onInit(): void {
            this.customers = this.customersWebService.getCustomers();
        }

        public customers: wsModels.Customer[];
    }
}
