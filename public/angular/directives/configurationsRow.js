angular.module('Curve')
	.directive("configurationsRow", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/configurations-row.html",
			scope: {
				configuration: "=",
				delete: "&"
			}
		}
	}); 