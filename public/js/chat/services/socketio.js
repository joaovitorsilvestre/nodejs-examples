angular.module('socketio', []).factory('Io', function(){
    var constructor = function(io) {
        this.on = function(socketName, callback){
            io.on(socketName, function(data){
                callback(data);
            })
        }

        this.emit = function(socketName, data){
            io.emit(socketName, data);
        }
    };

    return constructor
})
