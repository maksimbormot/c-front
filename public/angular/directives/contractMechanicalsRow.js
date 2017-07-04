angular.module('Curve')
	.directive("contractMechanicalsRow", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/contract-mechanicals-row.html",
			scope: {
				mechanical: "=",
				countries: "=",
				delete: "&"
			},
			link: function(scope){
				scope.groupFind = function(country){
					return country.continent;
				}
			}		
		}
	});