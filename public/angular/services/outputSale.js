angular.module('Curve')
	.factory('OutputSales', function OutputSalesFactory($http, Session){
		return{
			all: function(params, callback) {
				return $http({ method: 'GET', url: Session.apiUrl + '/outputSales?applicationToken=12345&token=' + Session.token + "&" + $.param(params) }).then(function(data){
					callback(data);
				});
			},
			get: function(id, callback) {
				return $http({ method: 'GET', url: Session.apiUrl + '/sales/' + id + '?applicationToken=12345&token=' + Session.token }).then(function(data){
					callback(data);
				});
			}
		}

	});    