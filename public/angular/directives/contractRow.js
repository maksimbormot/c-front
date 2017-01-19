angular.module('Curve')
	.directive("contractRow", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/contract-row.html",
			scope: {
				contract: "=",
				contracts: "=",
				delete: "&"
			}
		}
	});