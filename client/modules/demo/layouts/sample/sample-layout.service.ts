/// <reference path="../../../../../typings/index.d.ts"/>
/// <reference path="../../../../../typings/app.d.ts"/>

namespace demo.layouts.sample {
    @Injectable()
    export class SampleLayoutService {
        public getMenuItems(): MenuItems {
            return [
                { name: home.name, text: 'Home' },
                { name: 'component-basics', text: 'Component Basics' },
            ];
        }
    }

    export interface MenuItem {
        name: string;
        text: string;
    }

    export type MenuItems = MenuItem[];
}
