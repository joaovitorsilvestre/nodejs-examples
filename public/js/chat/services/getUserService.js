angular.module('chat').service('getUser', function($http, $cookies){
    this.username = function(callback){
        var session_id = $cookies.get('session_id');

        $http({
            url: '/accounts/who-am-i',
            method: 'GET',
            params: {session_id: session_id}
        }).then( function successCallback(response) {
            callback(null, response.data.user)
        }, function errorCallback(response) {
            callback (response.data.error, null);
        })
    }
})
