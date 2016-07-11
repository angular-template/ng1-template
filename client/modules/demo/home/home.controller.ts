/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="../../../../typings/app.d.ts"/>

namespace demo.home {
    interface IHomeBindings {
    }

    interface IHomeController extends ng.IComponentController, IHomeBindings {
        text1: string;
        text2: string;
    }

    @Component({
        selector: 'home',
        templateUrl: 'home/home.html',
        route: {
            url: '/',
            parent: demo.layouts.sample.component
        }
    }, demoModule)
    export class HomeComponent implements IHomeController {
        public $onInit(): void {
            this.text1 = 'Text1 Blah';
            this.text2 = 'Text2 Bleh';
        }

        public text1: string;
        public text2: string;
    }
}
