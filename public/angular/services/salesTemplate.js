angular.module('Curve')
	.factory('SalesTemplate', function SalesTemplateFactory($http, Session, Upload){
		return{
			all: function(params, callback) {
				return $http({ method: 'GET', url: 'http://localhost:8081/salesTemplates?applicationToken=12345&token=' + Session.token + "&" + $.param(params) }).then(function(data){
					callback(data);
				});
			},
			get: function(id, callback) {
				return $http({ method: 'GET', url: 'http://localhost:8081/salesTemplates/' + id + '?applicationToken=12345&token=' + Session.token }).then(function(data){
					callback(data);
				});
			},
			update: function(id, params, callback) {
				return $http({ method: "PUT", url: 'http://localhost:8081/salesTemplates/' + id + '?applicationToken=12345&token=' + Session.token, data: params, headers: {'Content-Type': 'application/json'} }).then(function(data){
					callback(data);
				});
			},
			delete: function(id, callback) {
				return $http.delete('http://localhost:8081/salesTemplates/' + id + '?applicationToken=12345&token=' + Session.token).then(function(data){
					callback(data);
				});
			},
			create: function(params, callback) {
				return $http({ method: "POST", url: 'http://localhost:8081/salesTemplates?applicationToken=12345&token=' + Session.token, data: params, headers: {'Content-Type': 'application/json'} }).then(function(data){
					callback(data);
				});
			},
			import: function(file, callback) {
				Upload.upload({
				url: 'http://localhost:8081/salesTemplates/upload?applicationToken=12345&token=' + Session.token,
				data: {
					file: file,
					another: "field"
				} 
				}).then(function(response) {
					callback(response)
				}, function(e){
					callback(e);
				}) 
			}		
		}
  
	});