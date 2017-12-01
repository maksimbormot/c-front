angular.module('Curve')
	.directive("transactionTableRow", function(){
		return {
			restrict: "A",
			templateUrl: "angular/templates/directives/transaction-table-row.html",
			scope: {
				transaction: "=",
				contractId: "="
			}
		}
	});