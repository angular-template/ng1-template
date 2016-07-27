/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="../../../../typings/app.d.ts"/>

// tslint:disable
namespace common.webservices {
    export interface ICustomersWebService {
        getCustomers(): common.webservices.models.Customer[];
    }

    export class CustomersWebService implements ICustomersWebService {
        public getCustomers(): common.webservices.models.Customer[] {
            return [
                { id: 1, firstName: 'Bill', lastName: 'Gates', startDate: new Date() },
                { id: 2, firstName: 'Steve', lastName: 'Jobs', startDate: new Date() }
            ];
        }
    }
    angular.module('common').service('customersWebService', CustomersWebService);
}

namespace common.webservices.models {
    export interface Customer {
        id: number;
        firstName: string;
        lastName: string;
        startDate: Date;
    }
}
