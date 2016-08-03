angular.module('chat', ['ngCookies','socketio'])
.run(function($rootScope){
    $rootScope.socketio = io
})
