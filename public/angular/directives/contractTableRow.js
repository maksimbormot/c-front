angular.module('Curve')
	.directive("contractTableRow", function(){
		return {
			restrict: "A",
			templateUrl: "angular/templates/directives/contract-table-row.html",
			scope: {
				contract: "="
			}
		}
	});