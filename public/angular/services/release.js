angular.module('Curve')
	.factory('Release', function ReleaseFactory($http, Session, Track, Upload){
		return {
			all: function(params, callback) {
				$http({ method: 'GET', url: 'http://localhost:8081/releases?applicationToken=12345&token=' + Session.token + "&" + $.param(params) }).then(function(data){
					callback(data);
				});
			},
			get: function(id, callback) {
				$http({ method: 'GET', url: 'http://localhost:8081/releases/' + id + '?applicationToken=12345&token=' + Session.token }).then(function(data){
					callback(data);
				});
			},
			update: function(id, params, callback) {
				$http({ method: "PUT", url: 'http://localhost:8081/releases/' + id + '?applicationToken=12345&token=' + Session.token, data: params, headers: {'Content-Type': 'application/json'} }).then(function(data){
					callback(data);
				});
			},
			delete: function(id, callback) {
				$http.delete('http://localhost:8081/releases/' + id + '?applicationToken=12345&token=' + Session.token).then(function(data){
					callback(data);
				});
			},
			create: function(params, callback) {
				$http({ method: "POST", url: 'http://localhost:8081/releases?applicationToken=12345&token=' + Session.token, data: $.param(params), headers: {'Content-Type': 'application/x-www-form-urlencoded'} }).then(function(data){
					callback(data);
				});
			},
			loadTracks: function(release, callback) {
				release.tracks = [];
				if(release.trackIds) {
					release.trackIds.forEach(function(trackId) {
						if(trackId) {
							Track.get(trackId, function(track) {
								release.tracks.push(track.data);
							});
						}
					});
					if(callback) { callback(release); }
				} else if(callback) { 
					callback(release); 
				}
			},
			import: function(file, callback) {
				Upload.upload({
				url: 'http://localhost:8081/releases/import?applicationToken=12345&token=' + Session.token,
				data: {
					file: file,
					another: "field"
				}
				}).then(function(response) {
					callback(response)
				}, function(e){
					callback(e);
				})
			},
			export: function(callback) {
				$http.get('http://localhost:8081/releases/export?applicationToken=12345&token=' + Session.token, {
				responseType: 'arraybuffer'
				}).then(function(data) {
					callback(data);
				}, function(e){
					callback(e);
				});
			}
		};
	});