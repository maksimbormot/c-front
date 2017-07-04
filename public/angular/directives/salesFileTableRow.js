angular.module('Curve')
	.directive("salesFileTableRow", function(){
		return {
			restrict: "A",
			templateUrl: "angular/templates/directives/sales-file-table-row.html",
			scope: {
				sale: "="
			}
		}
	});