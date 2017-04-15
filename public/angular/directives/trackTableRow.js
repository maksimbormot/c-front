angular.module('Curve')
	.directive("trackTableRow", function(){
		return {
			restrict: "A",
			templateUrl: "angular/templates/directives/track-table-row.html",
			scope: {
				track: "=",
				noLinks: "=",
				addIcon: "=",
				addFunction: "&"
			}
		}
	});