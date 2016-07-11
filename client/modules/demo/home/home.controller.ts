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
        route: {
            path: '/',
            parent: 'sample-layout'
        }
    }, demoModule)
    export class HomeComponent implements IHomeController {
        public text1: string = 'Text1 Blah';

        public text2: string = 'Text2 Bleh';

        public onDisplay(): void {
            alert(this.text1);
        }
    }
}
