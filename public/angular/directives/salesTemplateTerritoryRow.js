angular.module('Curve')
	.directive("salesTemplateTerritoryRow", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/sales-template-territory-row.html",
			scope: {
				territories: "=",
				territory: "=",
				delete: "&"
			},
			link: function(scope){
				scope.groupFind = function(country){
					return country.continent;
				}
			}			
		}
	});   