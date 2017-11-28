angular.module('Curve')
	.directive("outputSalesTableRow", function(){
		return {
			restrict: "A",
			templateUrl: "angular/templates/directives/output-sales-table-row.html",
			scope: {
				sale: "="
			}
		}
	});