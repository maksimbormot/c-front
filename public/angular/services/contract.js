angular.module('Curve')
  .factory('Contract', function ContractFactory($http, Session, Upload) {
    return {
      all: function(params, callback) {
        return $http({ method: 'GET', url: Session.apiUrl + '/contracts?applicationToken=12345&token=' + Session.token + "&" + $.param(params) }).then(function(data) {
          callback(data);
        });
      },
      get: function(id, callback) {
        return $http({ method: 'GET', url: Session.apiUrl + '/contracts/' + id + '?applicationToken=12345&token=' + Session.token }).then(function(data) {
          callback(data);
        });
      },
      update: function(id, params, callback) {
        return $http({ method: "PUT", url: Session.apiUrl + '/contracts/' + id + '?applicationToken=12345&token=' + Session.token, data: params, headers: { 'Content-Type': 'application/json' } }).then(function(data) {
          callback(data);
        });
      },
      delete: function(id, callback) {
        return $http.delete(Session.apiUrl + '/contracts/' + id + '?applicationToken=12345&token=' + Session.token).then(function(data) {
          callback(data);
        });
      },
      create: function(params, callback) {
        return $http({ method: "POST", url: Session.apiUrl + '/contracts?applicationToken=12345&token=' + Session.token, data: $.param(params), headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function(data) {
          callback(data);
        });
      },
      import: function(file, callback) {
        Upload.upload({
          url: Session.apiUrl + '/contracts/import?applicationToken=12345&token=' + Session.token,
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
        return $http.get(Session.apiUrl + '/contracts/export?applicationToken=12345&token=' + Session.token, {
          responseType: 'arraybuffer'
        }).then(function(data) {
          callback(data);
        }, function(e) {
          callback(e);
        });
      }
    };
  });
