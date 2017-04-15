angular.module('Curve')
	.directive("contractCostsRow", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/contract-costs-row.html",
			scope: {
				cost: "=",
				territories: "=",
				costTypes: "=",
				delete: "&"
			}
		}
	});