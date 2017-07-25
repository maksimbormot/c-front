angular.module('Curve')
	.directive("loading", ['$http', 'Loader', function($http, Loader){
		return {
			restrict: "E",
            replace:true,
			templateUrl: "angular/templates/directives/loading.html",
			link: function(scope, el){
				scope.isLoading = function(){
					return Loader.getLoader();
				};
			}
		}
	}]); 