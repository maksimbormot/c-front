angular.module('Curve')
	.directive("clientTableRow", function(){
		return {
			restrict: "A",
			templateUrl: "angular/templates/directives/client-table-row.html",
			scope: {
				client: "="
			}
		}
	});