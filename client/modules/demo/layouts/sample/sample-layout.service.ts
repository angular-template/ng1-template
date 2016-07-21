/// <reference path="../../../../../typings/index.d.ts"/>
/// <reference path="../../../../../typings/app.d.ts"/>

namespace demo.layouts.sample {
    @Injectable('sampleLayoutService')
    export class SampleLayoutService {
        public getMenuItems(): MenuItems {
            return [
                { name: home.name, text: 'Home' },
                { name: componentBasics.name, text: 'Component Basics' },
                { name: customers.name, text: 'Customers' },
            ];
        }
    }

    export interface MenuItem {
        name: string;
        text: string;
    }

    export type MenuItems = MenuItem[];
}
