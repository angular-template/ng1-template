/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../../../typings/app.d.ts" />

namespace common.layouts.main {
    /* @ngInject */
    export class LayoutController extends ngTemplate.core.bases.LayoutController<shell.ShellController> {
        constructor($scope: ngTemplate.core.bases.ILayoutControllerScope<shell.ShellController>) {
            super($scope);
        }
    }

    export const route: IPageState = createLayoutRoute('mainLayout', 'layouts/main/main-layout.html');
    registerController(LayoutController, route);
}
