angular.module('Curve')
	.directive("periodTableRow", function(){
		return {
			restrict: "A",
			templateUrl: "angular/templates/directives/periods/period-table-row.html",
			scope: {
				period: "="
			}
		}
	}); 