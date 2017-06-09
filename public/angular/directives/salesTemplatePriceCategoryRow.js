angular.module('Curve')
	.directive("salesTemplatePriceCategoryRow", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/sales-template-price-category-row.html",
			scope: {
				categories: "=",
				delete: "&"
			}			
		}
	}); 