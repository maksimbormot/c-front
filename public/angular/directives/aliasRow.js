angular.module('Curve')
	.directive("aliasRow", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/alias-row.html",
			scope: {
				alias: "=",
				delete: "&"
			}
		}
	});