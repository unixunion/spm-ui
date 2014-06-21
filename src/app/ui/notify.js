//angular.module('deblox.notify', [
//    'ui.bootstrap'
//])
//
//angular.module('deblox.notify', [])
//    .controller('NotifyCtrl', function($scope, WebSocket) {
//        $scope.alerts = [
//            { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
//            { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
//        ];
//
//        $scope.addAlert = function () {
//            $scope.alerts.push({msg: 'message!'});
//        };
//
//        $scope.closeAlert = function (index) {
//            $scope.alerts.splice(index, 1);
//        };
//    });

var DebloxNotifyModule = angular.module('DebloxNotifyModule', []);

DebloxNotifyModule.directive('popdown', function() {
    return {
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope) {
            $scope.show = false;
            $scope.status = null;
            $scope.message = null;

            $scope.alerts = [
                { type: 'danger', message: 'Oh snap! Change a few things up and try submitting again.' },
                { type: 'success', message: 'Well done! You successfully read this important alert message.' }
            ];

            $scope.$on('success', function(event, msg) {
                console.log("got success");
                $scope.type = 'success';
                $scope.message = msg;
                $scope.toggleDisplay();
            });

            $scope.$on('error', function(event, msg) {
                $scope.status = 'error';
                $scope.message = msg;
                $scope.toggleDisplay();
            });

            $scope.hide = function() {
                $scope.show = false;
                $scope.status = null;
                $scope.message = null;
            };

            $scope.toggleDisplay = function toggledisplay() {
                console.log("displaying " + $scope.type + " " + $scope.message);
                $scope.show = !!($scope.type && $scope.message);
            };
        },
        template: '<div class="alert alert-{{type}}" ng-show="show">' +
            '  <button type="button" class="close" ng-click="hide()">&times;</button>' +
            '  {{message}}' +
            '</div>'
    };
});