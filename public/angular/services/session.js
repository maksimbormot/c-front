angular.module('Curve')
	.factory('Session', function SessionFactory($http){
		return {
			isLoggedIn: false,
			token: null,
			userType: null,
			formats: [],
			priceCategories: [],
			contracts: []
		}
	});