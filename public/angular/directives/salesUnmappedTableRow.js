angular.module('Curve')
	.directive("salesUnmappedTableRow", function(){
		return {
			restrict: "A",
			templateUrl: "angular/templates/directives/sales-unmapped-table-row.html",
			scope: {
				sale: "=",
				noCheckbox: "=",
				noEdit: "=",
				single: "&"
			}
		}
	});