angular.module('Curve')
	.directive("contractReservesRow", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/contract-reserves-row.html",
			scope: {
				reserve: "=",
				index: "=",
				delete: "&"
			}
		}
	});