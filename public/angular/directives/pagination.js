angular.module('Curve')
	.directive("pagination", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/pagination.html",
			scope: {
				pages: "=",
				total: "=",
				current: "=",
				changePage: "&"
			}
		}
	});