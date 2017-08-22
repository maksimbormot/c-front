angular.module('Curve')
	.factory('Sales', function SalesFactory($http, Session){
		return{
			all: function(params, callback) {
				return $http({ method: 'GET', url: Session.apiUrl + '/sales?applicationToken=12345&token=' + Session.token + "&" + $.param(params) }).then(function(data){
					callback(data);
				});
			},
			get: function(id, callback) {
				return $http({ method: 'GET', url: Session.apiUrl + '/sales/' + id + '?applicationToken=12345&token=' + Session.token }).then(function(data){
					callback(data);
				});
			},
			update: function(id, params, callback) {
				return $http({ method: "PUT", url: Session.apiUrl + '/sales/' + id + '?applicationToken=12345&token=' + Session.token, data: params, headers: {'Content-Type': 'application/json'} }).then(function(data){
					callback(data);
				});
			},
			updateMultipleIds: function(ids, params, callback) {
				return $http({ method: "PUT", url: Session.apiUrl + '/sales/multiple_ids?applicationToken=12345&token=' + Session.token, data: params, headers: {'Content-Type': 'application/json'} }).then(function(data){
					callback(data);
				});
			},
			updateFiltered: function(params, body, callback) {
				return $http({ method: "PUT", url: Session.apiUrl + '/sales/filtered?applicationToken=12345&token=' + Session.token + "&" + $.param(params), data: body, headers: {'Content-Type': 'application/json'} }).then(function(data){
					callback(data);
				});
			},
			delete: function(id, callback) {
				return $http.delete(Session.apiUrl + '/sales/' + id + '?applicationToken=12345&token=' + Session.token).then(function(data){
					callback(data);
				});
			}			
		}

	});    