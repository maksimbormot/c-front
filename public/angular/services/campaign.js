angular.module('Curve')
  .factory('Campaign', function CampaignFactory($http, Session, Release, Track, Work, Upload) {
    return {
      all: function(params, callback) {
        return $http({ method: 'GET', url: Session.apiUrl + '/campaigns?applicationToken=12345&token=' + Session.token + "&" + $.param(params) }).then(function(data) {
          callback(data);
        });
      },
      get: function(id, callback) {
        return $http({ method: 'GET', url: Session.apiUrl + '/campaigns/' + id + '?applicationToken=12345&token=' + Session.token }).then(function(data) {
          callback(data);
        });
      },
      update: function(id, params, callback) {
        return $http({ method: "PUT", url: Session.apiUrl + '/campaigns/' + id + '?applicationToken=12345&token=' + Session.token, data: params, headers: { 'Content-Type': 'application/json' } }).then(function(data) {
          callback(data);
        });
      },
      delete: function(id, callback) {
        return $http.delete(Session.apiUrl + '/campaigns/' + id + '?applicationToken=12345&token=' + Session.token).then(function(data) {
          callback(data);
        });
      },
      create: function(params, callback) {
        return $http({ method: "POST", url: Session.apiUrl + '/campaigns?applicationToken=12345&token=' + Session.token, data: $.param(params), headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function(data) {
          callback(data);
        });
      },
      loadReleases: function(campaign, callback) {
        campaign.releases = [];
        campaign.releaseIds.forEach(function(releaseId) {
          if(releaseId) {
            Release.get(releaseId, function(release) {
              campaign.releases.push(release.data);
            });
          }
        });
        if(callback) { callback(campaign); }
      },
      loadTracks: function(campaign, callback) {
        campaign.tracks = [];
        campaign.trackIds.forEach(function(trackId) {
          if(trackId) {
            Track.get(trackId, function(track) {
              campaign.tracks.push(track.data);
            });
          }
        });
        if(callback) { callback(campaign); }
      },
      loadWorks: function(campaign, callback) {
        campaign.works = [];
        campaign.workIds.forEach(function(workId) {
          if(workId) {
            Work.get(workId, function(work) {
              campaign.works.push(work.data);
            });
          }
        });
        if(callback) { callback(campaign); }
      },
      import: function(file, callback) {
        Upload.upload({
          url: Session.apiUrl + '/campaigns/import?applicationToken=12345&token=' + Session.token,
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
        return $http.get(Session.apiUrl + '/campaigns/export?applicationToken=12345&token=' + Session.token, {
          responseType: 'arraybuffer'
        }).then(function(data) {
          callback(data);
        }, function(e) {
          callback(e);
        });
      }
    };
  });
