angular.module('Curve')
	.directive("costTableRow", function(){
		return {
			restrict: "A",
			templateUrl: "angular/templates/directives/cost-table-row.html",
			scope: {
				cost: "="
			}
		}
	});