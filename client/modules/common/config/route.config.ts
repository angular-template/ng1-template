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
            $rootScope.$on('$stateChangeError', (event: angular.IAngularEvent, toState: angular.ui.IState, toParams: Dictionary, fromState: angular.ui.IState, fromParams: Dictionary) => {
                $log.error(event, toState, toParams, fromState, fromParams);
            });
        }
    );
}
