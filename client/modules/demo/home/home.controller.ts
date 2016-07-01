/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace demo.home {
    import layout = layouts.sample;

    export class HomeController extends ngTemplate.core.bases.PageController<layout.LayoutController> {
        /* @ngInject */
        constructor($scope: IHomeControllerScope) {
            super($scope);
        }
    }

    interface IHomeControllerScope extends ngTemplate.core.bases.IPageControllerScope<layout.LayoutController> {
    }

    export const route: IPageState = {
        name: 'home',
        layout: layout.route,
        templateUrl: 'home/home.html',
        url: '/',
    };

    registerController(HomeController, route);
}
