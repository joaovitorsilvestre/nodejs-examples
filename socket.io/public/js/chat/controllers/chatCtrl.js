angular.module('chat').controller('chatCtrl', ['$scope', '$timeout', 'Io',
function($scope, $timeout, Io) {
    var socketio = new Io($scope.socketio, '/chat');
    $scope.messages = [];

    $scope.sendMessage = function(){
        if (!$scope.user) return;

        var msg = $scope.msgInput;
        if (msg) {
            socketio.emit('message', {'user': $scope.user, 'message': msg});
        };
        $scope.msgInput = null;
    };

    socketio.on('message', function(data) {
        $timeout(function () {
            $scope.messages.push(data.user + ': ' + data.message);
            console.log(data);
        }, 300);
    })
}])
