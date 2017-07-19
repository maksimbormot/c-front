angular.module('Curve')
	.factory('SalesFile', function SalesFileFactory($http, Session, Upload){
		return{
			all: function(params, callback) {
				$http({ method: 'GET', url: Session.apiUrl + '/salesFiles?applicationToken=12345&token=' + Session.token + "&" + $.param(params) }).then(function(data){
					callback(data);
				});
			},
			get: function(id, callback) {
				$http({ method: 'GET', url: Session.apiUrl + '/salesFiles/' + id + '?applicationToken=12345&token=' + Session.token }).then(function(data){
					callback(data);
				});
			},
			update: function(id, params, callback) {
				$http({ method: "PUT", url: Session.apiUrl + '/salesFiles/' + id + '?applicationToken=12345&token=' + Session.token, data: params, headers: {'Content-Type': 'application/json'} }).then(function(data){
					callback(data);
				});
			},
			delete: function(id, callback) {
				$http.delete(Session.apiUrl + '/salesFiles/' + id + '?applicationToken=12345&token=' + Session.token).then(function(data){
					callback(data);
				});
			},
			create: function(params, callback) {
			$http({ method: "POST", url: Session.apiUrl + '/salesFiles?applicationToken=12345&token=' + Session.token, data: params, headers: {'Content-Type': 'application/json'} }).then(function(data){
					callback(data);
				});
			},
			ingest: function(id, params, callback) {
				$http({ method: "POST", url: Session.apiUrl + '/salesFiles/' + id + '/ingest?applicationToken=12345&token=' + Session.token, headers: {'Content-Type': 'application/json'} }).then(function(data){
					callback(data);
				});
			},
			export: function(callback) {
				$http.get(Session.apiUrl + '/salesFiles/export?applicationToken=12345&token=' + Session.token, {
				responseType: 'arraybuffer'
				}).then(function(data) {
					callback(data);
				}, function(e){
					callback(e);
				});
			},
			import: function(file, callback) {
				Upload.upload({
				url: Session.apiUrl + '/salesFiles/upload?applicationToken=12345&token=' + Session.token,
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