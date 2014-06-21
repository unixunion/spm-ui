angular.module( 'SPMui', [
  'templates-app',
  'templates-common',
  'ui.router',
//  'ui.bootstrap',
  'deblox.websocket',
  'DebloxNotifyModule',
  'LeadModule'
])


.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
})

.controller('AppCtrl', function($scope, $route, $routeParams, $location) {
    console.log("AppCtrl called");
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
})

.controller('NotifyCtrl', function($scope) {
    console.log($scope);
    // notifies when $broadcast.success()...
    $scope.success = function(msg) { $scope.$broadcast('success', msg); };
    $scope.error   = function(msg) { $scope.$broadcast('error', msg); };
})


.controller('LeadCtrl', function($scope) {
    console.log("Lead Controller");
    $scope.leads = [];
});

//function AlertDemoCtrl($scope) {
//    $scope.alerts = [
//        { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
//        { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
//    ];
//
//    $scope.addAlert = function() {
//        $scope.alerts.push({msg: 'message!'});
//    };
//
//    $scope.closeAlert = function(index) {
//        $scope.alerts.splice(index, 1);
//    };
//}


