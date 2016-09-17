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
                fromParams: { [key: string]: string },
                error: Object
            ) => {
                $log.error('State change error:', error);
                $log.error('To state:', toState);
                $log.error('To params:', toParams);
                $log.error('From state:', fromState);
                $log.error('From params:', fromParams);
            });
        }
    );
}
