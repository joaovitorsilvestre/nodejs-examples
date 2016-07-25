angular.module('chat').controller('ChatCtrl', ['$scope','$timeout','Io','getUser',
function($scope, $timeout, Io, getUser) {
    var socketio = new Io( $scope.socketio );
    getUser.username(function(user){
        $scope.user = user.data.user;
    });
    $scope.messages = [];

    $scope.sendMessage = function(){
        var msg = $scope.msgInput
        if (msg) {
            socketio.emit('chat', {user:$scope.user, message:msg});
        };
        $scope.msgInput = null;
    }

    socketio.on('chat', function(data) {
        $timeout( function updateMessages(){
            $scope.messages.push(data.user + ' : ' + data.message );
        }, 300)
    })
}
])
