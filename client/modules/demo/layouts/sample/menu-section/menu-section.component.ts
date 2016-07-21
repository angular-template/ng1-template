/// <reference path="../../../../../../typings/index.d.ts"/>
/// <reference path="../../../../../../typings/app.d.ts"/>

namespace demo.layouts.sample.menuSection {
    export const name: string = 'menu-section';

    @Component({
        selector: name,
        templateUrl: 'layouts/sample/menu-section/menu-section.html'
    }, demoModule)
    export class MenuSection implements ng.IComponentController {
        @bind.oneWay()
        public menuItems: MenuItems;
    }
}
