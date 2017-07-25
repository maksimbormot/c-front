angular.module('Curve')
	.factory('Search', function SearchFactory($http, Session){
		return{
			get: function(text, callback) {
				return $http({ method: 'GET', url: 'http://localhost:8081/search/' + '?text='+ text + '&applicationToken=12345&token=' + Session.token }).then(function(data){
					callback(data);
				});
			}		
		}
	});    