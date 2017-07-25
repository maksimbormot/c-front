angular.module('Curve')
	.factory('User', function UserFactory($http, Session){
		return {
			get: function(id, callback) {
				return $http({ method: 'GET', url: 'http://localhost:8081/users/' + id + '?applicationToken=12345&token=' + Session.token }).then(function(data){
					callback(data);
				});
			},
			update: function(id, params, callback) {
				return $http({ method: "PUT", url: 'http://localhost:8081/users/' + id + '?applicationToken=12345&token=' + Session.token, data: params, headers: {'Content-Type': 'application/json'} }).then(function(data){
					callback(data);
				});
			},
			create: function(params, callback) {
				return $http({ method: "POST", url: 'http://localhost:8081/users?applicationToken=12345&token=' + Session.token, data: $.param(params), headers: {'Content-Type': 'application/x-www-form-urlencoded'} }).then(function(data){
					callback(data);
				});
			}
		};
	});