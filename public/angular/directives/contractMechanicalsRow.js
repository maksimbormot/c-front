angular.module('Curve')
	.directive("contractMechanicalsRow", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/contract-mechanicals-row.html",
			scope: {
				mechanical: "=",
				territories: "=",
				delete: "&"
			}
		}
	});