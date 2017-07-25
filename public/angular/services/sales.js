angular.module('Curve')
	.factory('Sales', function SalesFactory($http, Session){
		return{
			all: function(params, callback) {
				return $http({ method: 'GET', url: 'http://localhost:8081/sales?applicationToken=12345&token=' + Session.token + "&" + $.param(params) }).then(function(data){
					callback(data);
				});
			},
			get: function(id, callback) {
				return $http({ method: 'GET', url: 'http://localhost:8081/sales/' + id + '?applicationToken=12345&token=' + Session.token }).then(function(data){
					callback(data);
				});
			},
			update: function(id, params, callback) {
				return $http({ method: "PUT", url: 'http://localhost:8081/sales/' + id + '?applicationToken=12345&token=' + Session.token, data: params, headers: {'Content-Type': 'application/json'} }).then(function(data){
					callback(data);
				});
			},
			delete: function(id, callback) {
				return $http.delete('http://localhost:8081/sales/' + id + '?applicationToken=12345&token=' + Session.token).then(function(data){
					callback(data);
				});
			}			
		}

	});    