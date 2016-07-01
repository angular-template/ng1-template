/// <reference path="../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../typings/app.d.ts" />

namespace demo.layouts.sample {
    /* @ngInject */
    export class LayoutController extends ngTemplate.core.bases.LayoutController<common.shell.ShellController> {
        constructor($scope: ngTemplate.core.bases.ILayoutControllerScope<common.shell.ShellController>) {
            super($scope);
        }
    }

    export const route: IPageState = createLayoutRoute('sampleLayout', 'layouts/sample/sample-layout.html');
    registerController(LayoutController, route);
}
