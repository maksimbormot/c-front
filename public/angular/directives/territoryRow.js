angular.module('Curve')
	.directive("territoryRow", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/territory-row.html",
			scope: {
				territory: "=",
				delete: "&"
			}
		}
	}); 