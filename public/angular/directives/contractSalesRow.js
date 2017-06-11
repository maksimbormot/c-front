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
				delete: "&"
			},
			link: function(scope){
				scope.groupFind = function(country){
					return country.country;
				}
			}		
		}
	}); 