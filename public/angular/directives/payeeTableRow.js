angular.module('Curve')
	.directive("payeeTableRow", function(){
		return {
			restrict: "A",
			templateUrl: "angular/templates/directives/payee-table-row.html",
			scope: {
				payee: "="
			}
		}
	});