/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="../../../../typings/app.d.ts"/>

namespace demo.home {
    interface IHomeBindings {
    }

    interface IHomeController extends ng.IComponentController, IHomeBindings {
        text1: string;
        text2: string;
    }

    export class HomeComponent implements IHomeController {
        public $onInit(): void {
            this.text1 = 'Text1 Blah';
            this.text2 = 'Text2 Bleh';
        }

        public text1: string;
        public text2: string;
    }

    app.registerComponent({
        name: 'home',
        templateUrl: 'home/home.html',
        controller: HomeComponent,
        route: {
            url: '/home',
            parent: demo.layouts.sample.component,
        },
    }, demoModule)
}
