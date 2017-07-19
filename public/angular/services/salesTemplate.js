angular.module('Curve')
	.factory('SalesTemplate', function SalesTemplateFactory($http, Session, Upload){
		return{
			all: function(params, callback) {
				$http({ method: 'GET', url: Session.apiUrl + '/salesTemplates?applicationToken=12345&token=' + Session.token + "&" + $.param(params) }).then(function(data){
					callback(data);
				});
			},
			get: function(id, callback) {
				$http({ method: 'GET', url: Session.apiUrl + '/salesTemplates/' + id + '?applicationToken=12345&token=' + Session.token }).then(function(data){
					callback(data);
				});
			},
			update: function(id, params, callback) {
				$http({ method: "PUT", url: Session.apiUrl + '/salesTemplates/' + id + '?applicationToken=12345&token=' + Session.token, data: params, headers: {'Content-Type': 'application/json'} }).then(function(data){
					callback(data);
				});
			},
			delete: function(id, callback) {
				$http.delete(Session.apiUrl + '/salesTemplates/' + id + '?applicationToken=12345&token=' + Session.token).then(function(data){
					callback(data);
				});
			},
			create: function(params, callback) {
			$http({ method: "POST", url: Session.apiUrl + '/salesTemplates?applicationToken=12345&token=' + Session.token, data: params, headers: {'Content-Type': 'application/json'} }).then(function(data){
					callback(data);
				});
			},
			import: function(file, callback) {
				Upload.upload({
				url: Session.apiUrl + '/salesTemplates/upload?applicationToken=12345&token=' + Session.token,
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