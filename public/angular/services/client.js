angular.module('Curve')
  .factory('Client', function ClientFactory($http, Session) {
    return {
      all: function(params, callback) {
        return $http({ method: 'GET', url: Session.apiUrl + '/clients?applicationToken=12345&token=' + Session.token + "&" + $.param(params) }).then(function(data) {
          callback(data);
        });
      },
      get: function(id, callback) {
        return $http({ method: 'GET', url: Session.apiUrl + '/clients/' + id + '?applicationToken=12345&token=' + Session.token }).then(function(data) {
          callback(data);
        });
      },
      update: function(id, params, callback) {
        return $http({ method: "PUT", url: Session.apiUrl + '/clients/' + id + '?applicationToken=12345&token=' + Session.token, data: params, headers: { 'Content-Type': 'application/json' } }).then(function(data) {
          callback(data);
        });
      },
      delete: function(id, callback) {
        return $http.delete(Session.apiUrl + '/clients/' + id + '?applicationToken=12345&token=' + Session.token).then(function(data) {
          callback(data);
        });
      },
      create: function(params, callback) {
        return $http({ method: "POST", url: Session.apiUrl + '/clients?applicationToken=12345&token=' + Session.token, data: $.param(params), headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function(data) {
          callback(data);
        });
      }
    };
  });
