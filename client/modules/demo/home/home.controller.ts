/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="../../../../typings/app.d.ts"/>

namespace demo.home {
    @Component({
        selector: 'home'
    }, demoModule)
    export class HomeComponent implements ng.IComponentController {
        public text1: string = 'Text1 Blah';

        public text2: string = 'Text2 Bleh';

        public onDisplay(): void {
            alert(this.text1);
        }

        public static route: ng1Template.core.IComponentRoute = {
            path: '/',
            parent: 'sample-layout'
        }
    }
}
