angular.module('Curve')
	.directive("unmappedTableRow", function(){
		return {
			restrict: "A",
			templateUrl: "angular/templates/directives/unmapped-table-row.html",
			scope: {
				unmapped: "="
			}
		}
	});