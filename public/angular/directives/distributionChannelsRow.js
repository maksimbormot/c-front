angular.module('Curve')
	.directive("distributionChannelsRow", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/distribution-channels-row.html",
			scope: {
				channel: "=",
				delete: "&"
			}
		}
	});  