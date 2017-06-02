angular.module('Curve')
	.directive("priceCategoryRow", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/price-category-row.html",
			scope: {
				category: "=",
				delete: "&"
			}
		}
	}); 