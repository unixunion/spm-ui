angular.module('deblox.websocket', [
    'angular-websocket',
    'controllers',
    'ui.bootstrap',
    'DebloxNotifyModule'
])

//var notify = angular.module('DebloxNotifyModule',[])

.config(function(WebSocketProvider){
    WebSocketProvider
        .prefix('')
        .uri('ws://127.0.0.1:3001/ws/bcast');
});

angular.module('controllers', [])
    .controller('WebsocketCtrl', function($scope, WebSocket) {

        WebSocket.onopen(function() {
            console.log('connection');
//            WebSocket.send('message');
        });

        WebSocket.onmessage(function(event) {
            console.log('message: ', event.data);
            console.log($scope);
            // send the event to whatever scope has included this websocket controller.
            $scope.$parent.$broadcast('event', event.data);
        });
});

