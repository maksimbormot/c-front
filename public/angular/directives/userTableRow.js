angular.module('Curve')
	.directive("userTableRow", function(){
		return {
			restrict: "A",
			templateUrl: "angular/templates/directives/user-table-row.html",
			scope: {
				user: "=",
				addFunction: "&"
			}
		}
	});