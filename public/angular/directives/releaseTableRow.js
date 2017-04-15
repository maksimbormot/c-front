angular.module('Curve')
	.directive("releaseTableRow", function(){
		return {
			restrict: "A",
			templateUrl: "angular/templates/directives/release-table-row.html",
			scope: {
				release: "=",
				noLinks: "=",
				addIcon: "=",
				addFunction: "&"
			}
		}
	});