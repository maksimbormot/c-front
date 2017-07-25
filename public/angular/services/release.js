angular.module('Curve')
  .factory('Release', function ReleaseFactory($http, Session, Track, Upload) {
    return {
      all: function(params, callback) {
        return $http({ method: 'GET', url: Session.apiUrl + '/releases?applicationToken=12345&token=' + Session.token + "&" + $.param(params) }).then(function(data) {
          callback(data);
        });
      },
      get: function(id, callback) {
        return $http({ method: 'GET', url: Session.apiUrl + '/releases/' + id + '?applicationToken=12345&token=' + Session.token }).then(function(data) {
          callback(data);
        });
      },
      update: function(id, params, callback) {
        return $http({ method: "PUT", url: Session.apiUrl + '/releases/' + id + '?applicationToken=12345&token=' + Session.token, data: params, headers: { 'Content-Type': 'application/json' } }).then(function(data) {
          callback(data);
        });
      },
      delete: function(id, callback) {
        return $http.delete(Session.apiUrl + '/releases/' + id + '?applicationToken=12345&token=' + Session.token).then(function(data) {
          callback(data);
        });
      },
      create: function(params, callback) {
        return $http({ method: "POST", url: Session.apiUrl + '/releases?applicationToken=12345&token=' + Session.token, data: $.param(params), headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function(data) {
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
          url: Session.apiUrl + '/releases/import?applicationToken=12345&token=' + Session.token,
          data: {
            file: file,
            another: "field"
          }
        }).then(function(response) {
          callback(response)
        }, function(e) {
          callback(e);
        })
      },
      export: function(callback) {
        return $http.get(Session.apiUrl + '/releases/export?applicationToken=12345&token=' + Session.token, {
          responseType: 'arraybuffer'
        }).then(function(data) {
          callback(data);
        }, function(e) {
          callback(e);
        });
      }
    };
  });
