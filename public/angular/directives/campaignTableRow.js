angular.module('Curve')
	.directive("campaignTableRow", function(){
		return {
			restrict: "A",
			templateUrl: "angular/templates/directives/campaign-table-row.html",
			scope: {
				campaign: "="
			}
		}
	});