angular.module('Curve')
	.directive("contractCostsRow", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/contract-costs-row.html",
			scope: {
				cost: "=",
				countries: "=",
				costTypes: "=",
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