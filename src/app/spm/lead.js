var LeadModule = angular.module('LeadModule', []);

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
                    '{{lead}}<span class="caret"></span>' +
                    '</button>'+
                    '<ul class="dropdown-menu" role="menu">' +
                    '<li><a href="#">Action</a></li>' +
                    '<li><a href="#">Another action</a></li>' +
                    '<li><a href="#">Something else here</a></li>' +
                    '<li class="divider"></li>' +
                    '<li><a href="#">Separated link</a></li>' +
                    '</ul>' +
                    '</div>'
    };
});