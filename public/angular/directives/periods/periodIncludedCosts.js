angular.module('Curve')
  .directive("periodIncludedCosts", [ 'Loader', 'SelectAll', function(Loader, SelectAll) {
    return {
      restrict: "E",
      templateUrl: "angular/templates/directives/periods/period-included-costs.html",
      scope: true,
      link: function($scope) {
      	removeSelectedFromExcluded();

        $scope.excludeAllCosts = function(e) {
          $scope.includeCosts.forEach(function(cost) {
            $scope.costs.push(cost);
          });
          $scope.includeCosts.splice(0, $scope.includeCosts.length);
          setCostsToPeriod();
          SelectAll.deselect(e);
        }

        $scope.selectAll = function(e){
    			SelectAll.select(e)
    		};

        $scope.excludeSelectedCosts = function() {
          var count = 0;
          var removals = [];
          $scope.includeCosts.forEach(function(include, index) {
            if(include.selected) {
              count++;
              include.selected = false;
              $scope.costs.push(include);
              removals.push(index);
            }
          });
          removals.reverse().forEach(function(index) {
          	$scope.includeCosts.splice(index, 1);
          });
          if(count == 0) {
            Loader.error('Choose at Least One Cost');
          }
          setCostsToPeriod();
        }

        $scope.includeAllCosts = function(e) {
          if($scope.includeCosts.length == 0) {
            $scope.costs.forEach(function(cost) {
              $scope.includeCosts.push(angular.extend({}, cost));
            });
          } else {
            $scope.costs.forEach(function(cost) {
              var count = 0;
              $scope.includeCosts.forEach(function(include) {
                if(cost._id == include._id) {
                  count++;
                }
              });
              if(count == 0) {
                $scope.includeCosts.push(angular.extend({}, cost));
              }
            });
          }
          removeSelectedFromExcluded();
          setCostsToPeriod();
          SelectAll.deselect(e);
        }

        $scope.includeSelectedCosts = function() {
          Loader.load();
          var num = 0,
            count = 0;
          var selectedCosts = [];
          $scope.costs.forEach(function(cost) {
            if(cost.selected) {
              if($scope.includeCosts.length > 0) {
                $scope.includeCosts.forEach(function(include) {
                  if(cost._id != include._id) {
                    count++;
                  } else {
                    num++;
                  }
                });
                if(num == 0) {
                  cost.selected = false;
                  selectedCosts.push(angular.extend({}, cost));
                }
              } else {
                count++;
                cost.selected = false;
                selectedCosts.push(angular.extend({}, cost));
              }
            }
          });
          if(num > 0) {
            Loader.error('This file has already been selected');
          } else if(count > 0) {
            selectedCosts.forEach(function(cost) {
              $scope.includeCosts.push(angular.extend({}, cost));
              Loader.complete();
            });
          } else {
            Loader.error('Choose at Least One Cost');
          }
          removeSelectedFromExcluded();
          setCostsToPeriod();
        }

        function removeSelectedFromExcluded() {
        	$scope.includeCosts.forEach(function(cost) {
        		$scope.costs.forEach(function(excludedCost) {
        			// Needs to match ID as objects are not the same
        			if(cost._id == excludedCost._id) {
        				var index = $scope.costs.indexOf(excludedCost);
		        		$scope.costs.splice(index, 1);
        			}
        		});
        	});
        }

        function setCostsToPeriod() {
        	$scope.period.costIds = $scope.includeCosts.map(function(cost) { return cost._id });
        }

      }
    }
  }]);
