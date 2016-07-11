/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="../../../../typings/app.d.ts"/>

namespace demo.formField {
    @Component({
        selector: 'form-field'
    }, demoModule)
    export class FormFieldComponent implements ng.IComponentController {
        @bind.oneWay()
        public id: string;

        @bind.oneWay()
        public label: string;

        @bind.oneWay()
        public inputType: string;

        public $onInit(): void {
            if (!this.inputType) {
                this.inputType = 'text';
            }
        }
    }
}
