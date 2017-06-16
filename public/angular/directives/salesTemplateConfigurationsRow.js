angular.module('Curve')
	.directive("salesTemplateConfigurationsRow", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/sales-template-configurations-row.html",
			scope: {
				configurations: "=",
				configuration: "=",
				delete: "&"
			}			
		}
	}); 