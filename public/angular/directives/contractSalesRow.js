angular.module('Curve')
	.directive("contractSalesRow", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/contract-sales-row.html",
			scope: {
				sale: "=",
				territories: "=",
				channels: "=",
				configurations: "=",
				priceCategories: "=",
				salesTypes: "=",
				delete: "&"
			}
		}
	});