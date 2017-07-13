angular.module('Curve')
	.directive("costTypesRow", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/cost-types-row.html",
			scope: {
				type: "=",
				delete: "&"
			}
		}
	}); 