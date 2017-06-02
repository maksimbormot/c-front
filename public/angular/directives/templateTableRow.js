angular.module('Curve')
	.directive("templateTableRow", function(){
		return {
			restrict: "A",
			templateUrl: "angular/templates/directives/template-table-row.html",
			scope: {
				template: "="
			}
		}
	});