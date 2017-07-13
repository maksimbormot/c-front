angular.module('Curve')
	.directive("territorySelect", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/territory-select.html",
			scope: {
				territory: "&",
				countries: "="
			},
			link: function(scope){
				scope.groupFind = function(country){
					return country.continent;
				}
			}		
		}
	});