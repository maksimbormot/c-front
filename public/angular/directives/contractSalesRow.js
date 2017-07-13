angular.module('Curve')
	.directive("contractSalesRow", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/contract-sales-row.html",
			scope: {
				sale: "=",
				countries: "=",
				channels: "=",
				configurations: "=",
				priceCategories: "=",
				salesTypes: "=",
				index: "=",
				delete: "&"
			},
			link: function(scope){
				scope.groupFind = function(country){
					return country.continent;
				}
			}		
		}
	}); 