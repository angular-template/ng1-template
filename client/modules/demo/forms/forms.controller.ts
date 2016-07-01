/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace demo.forms {
    import layout = layouts.sample;

    export class FormsController extends ngTemplate.core.bases.PageController<layout.LayoutController> {
        /* @ngInject */
        constructor($scope: IFormsControllerScope) {
            super($scope);
        }

        public selectData: TextPair[] = [
            { value: '001', text: 'First Item' },
            { value: '002', text: 'Second Item' },
            { value: '003', text: 'Third Item' },
            { value: '004', text: 'Fourth Item' },
            { value: '005', text: 'Fifth Item' },
        ];

        public selectedValue: string;
        public selectedValues: string[];

        public checkedValue: string = 'YES';
    }

    export interface IFormsControllerScope extends ngTemplate.core.bases.IPageControllerScope<layout.LayoutController> {
    }

    export const route: IPageState = {
        name: 'forms',
        layout: layout.route,
        templateUrl: 'forms/forms.html',
        url: '/demos/forms',
        title: 'Forms Demo',
    };

    registerController(FormsController, route);
}
