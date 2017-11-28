angular.module('Curve')
	.directive("periodProcessingStatusElement", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/periods/period-processing-status-element.html",
			scope: {
				name: "=",
				index: "=",
				currentStatus: "=",
				erroredStatus: "="
			}
		}
	}); 