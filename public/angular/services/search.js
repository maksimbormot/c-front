angular.module('Curve')
	.factory('Search', function SearchFactory($http, Session){
		return{
			get: function(text, callback) {
				return $http({ method: 'GET', url: Session.apiUrl + '/search/' + '?text='+ text + '&applicationToken=12345&token=' + Session.token }).then(function(data){
					callback(data);
				});
			}		
		}
	});    