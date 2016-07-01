namespace common.shell {
    export class ShellController extends ngTemplate.core.bases.BaseShellController {
        /* @ngInject */
        constructor($injector: angular.auto.IInjectorService) {
            super($injector);
        }
    }

    commonModule.controller('shellController', ShellController);
}
