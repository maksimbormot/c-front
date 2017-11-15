angular.module('Curve')
	.directive("periodNew", function(){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/periods/period-new.html",
			scope: true,
			link: function($scope){
				$scope.startDatePopup = false;
	      $scope.endDatePopup = false;

	      $scope.openStartDatePopup = function() {
	        $scope.startDatePopup = true;
	      }

	      $scope.openEndDatePopup = function() {
	        $scope.endDatePopup = true;
	      }

			}
		}
	}); 

