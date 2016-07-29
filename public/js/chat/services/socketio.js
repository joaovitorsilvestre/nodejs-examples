angular.module('socketio', []).factory('Io', function(){
    var constructor = function(io, nameSpace) {
        var _io = io(nameSpace);
        this.on = function(socketName, callback){
            _io.on(socketName, function(data){
                callback(data);
            })
        }

        this.emit = function(socketName, data){
            _io.emit(socketName, data);
        }
    };

    return constructor
})
