namespace common.config {
    //Default routing behavior
    commonModule.config(
        /* @ngInject */
        ($locationProvider: angular.ILocationProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => {
            $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise('/');
        }
    );

    //Default state change error handling
    commonModule.run(
        /* @ngInject */
        ($rootScope: angular.IRootScopeService, $log: angular.ILogService) => {
            $rootScope.$on('$stateChangeError', (
                event: angular.IAngularEvent,
                toState: angular.ui.IState,
                toParams: { [key: string]: string },
                fromState: angular.ui.IState,
                fromParams: { [key: string]: string }
            ) => {
                $log.error(event, toState, toParams, fromState, fromParams);
            });
        }
    );
}
