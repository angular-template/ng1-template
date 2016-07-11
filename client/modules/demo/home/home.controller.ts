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
        public text1: string = 'Text1 Blah';

        public text2: string = 'Text2 Bleh';

        public onDisplay() {
            alert(this.text1);
        }
    }
}
