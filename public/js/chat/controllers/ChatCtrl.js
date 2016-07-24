angular.module('chat').controller('ChatCtrl', ['$scope', 'Io',
function($scope, Io) {
    $scope.messages = [];

    $scope.sendMessage = function(msg){
        Io.emit('chat', msg);
    }

    Io.on('chat', function(data) {
        $scope.$apply(function(){
            $scope.messages.push('Socket ' + data.id + ' : ' + data.message );
            $scope.msgInput = '';
        });
    })

}
])
