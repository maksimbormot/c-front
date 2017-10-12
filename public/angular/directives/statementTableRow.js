angular.module('Curve')
	.directive("statementTableRow", function(){
		return {
			restrict: "A",
			templateUrl: "angular/templates/directives/statement-table-row.html",
			scope: {
				statement: "=",
				noLinks: "="
			}
		}
	});