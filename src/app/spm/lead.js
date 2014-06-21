var LeadModule = angular.module('LeadModule', ['ngRoute']);

LeadModule.directive('leads', function() {
    return {
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope) {
            $scope.show = false;
            $scope.status = null;
            $scope.message = null;

            // place to store the leads
            $scope.leads = [];

            // push new leads into the list above
            $scope.$on('event', function(event, msg) {
                console.log("leads: got event " + msg);
                $scope.leads.push(angular.fromJson(msg));
            });

            $scope.closeAlert = function (index) {
                $scope.leads.splice(index, 1);
            };

            $scope.toggleDisplay = function toggledisplay() {
                console.log("show lead " + $scope.leads);
                $scope.show = !!($scope.leads);
            };
        },
//        template: '<alert ng-repeat="lead in leads"  type="success" close="closeAlert($index)">{{lead}}</alert>'
        template:   '<div ng-repeat="lead in leads" class="btn-group" dropdown is-open="status.isopen">' +
                    '<button type="button" class="btn btn-primary dropdown-toggle" ng-disabled="disabled">' +
                    '{{lead.newlead.name}}<span class="caret"></span>' +
                    '</button>'+
                    '<ul class="dropdown-menu" role="menu">' +
                    '<li><a href="leads/accept/{{lead.newlead.uuid}}">Accept</a></li>' +
                    '<li><a href="#">Another action</a></li>' +
                    '<li><a href="#">Something else here</a></li>' +
                    '<li class="divider"></li>' +
                    '<li><a href="#">Separated link</a></li>' +
                    '</ul>' +
                    '</div>'
    };
});

//LeadModule.controller('LeadRouteCtrl', function($scope, $route, $routeParams, $location) {
//    $scope.$route = $route;
//    $scope.$location = $location;
//    $scope.$routeParams = $routeParams;
//    console.log("Other LeadCtrl");
//})

LeadModule.controller('LeadAcceptCtrl', function($scope, $routeParams) {
    $scope.name = "LeadAcceptCtrl";
    $scope.params = $routeParams;
    console.log("LeadAcceptCtrl route");
});

//LeadModule.config(function config( $stateProvider ) {
//    console.log("configuring stateprovider");
//    $stateProvider.state( 'leads', {
//        url: '/leads',
//        views: {
//            "main": {
//                controller: 'LeadCtrl'
////                templateUrl: 'home/home.tpl.html'
//            }
//        },
//        data:{ pageTitle: 'Leads' }
//    });
//});


LeadModule.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/leads/accept/:leadId', {
            templateUrl: 'spm/lead.tpl.html',
            controller: 'LeadAcceptCtrl',
            resolve: {
                // I will cause a 1 second delay
                delay: function($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 1000);
                    return delay.promise;
                }
            }
        });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
});

//LeadModule.config(['$routeProvider',
//    function($routeProvider) {
//        $routeProvider.
//            when('/leads/accept/:leadId', {
////                templateUrl: 'partials/phone-list.html',
//                controller: 'LeadRouteCtrl'
//            }).
//            otherwise({
//                redirectTo: '/leads'
//            });
//    }]);