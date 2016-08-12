angular.module('chat', ['socketio'])
    .run(function($rootScope) {
        // this io was imported in 'chat/index.js'
        // so we make this script avaliable in scope of the controllers
        $rootScope.socketio = io
    })
