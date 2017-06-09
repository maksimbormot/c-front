angular.module('Curve')
	.directive("salesTemplateDistributionChannelsRow", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/sales-template-distribution-channels-row.html",
			scope: {
				channels: "=",
				delete: "&"
			}			
		}
	}); 