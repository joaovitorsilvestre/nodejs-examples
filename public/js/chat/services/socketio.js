angular.module('socketio', []).factory('Io', function($http){
    var _socket = io();

    return {
        on: function(socketName, callback){
            _socket.on(socketName, function(data){
                callback(data);
            })
        },
        emit: function(socketName, data){
            _socket.emit(socketName, data);
        }
    }
})
