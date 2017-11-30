angular.module('Curve')
  .directive("periodIncludedSales", ['Loader', 'SelectAll', function(Loader, SelectAll) {
    return {
      restrict: "E",
      templateUrl: "angular/templates/directives/periods/period-included-sales.html",
      scope: true,
      link: function($scope) {
      	removeSelectedFromExcluded();

        $scope.excludeAllSales = function(e) {
          $scope.includeSalesFiles.forEach(function(sale) {
          	$scope.salesFiles.push(sale);
          });
          $scope.includeSalesFiles.splice(0, $scope.includeSalesFiles.length);
          SelectAll.deselect(e)
          setSalesToPeriod();
        }

        $scope.selectAll = function(e){
    			SelectAll.select(e)
    		};

        $scope.excludeSelectedSales = function() {
          var count = 0;
          var removals = [];
          $scope.includeSalesFiles.forEach(function(include, index) {
            if(include.selected) {
              count++;
              include.selected = false;
              $scope.salesFiles.push(include);
              removals.push(index);
            }
          });
          removals.reverse().forEach(function(index) {
          	$scope.includeCosts.splice(index, 1);
          });
          if(count == 0) {
            Loader.error('Choose at Least One Sales File');
          }
          setSalesToPeriod();
        }

        $scope.includeAllSales = function(e) {
          if($scope.includeSalesFiles.length == 0) {
            $scope.salesFiles.forEach(function(sale) {
              $scope.includeSalesFiles.push(angular.extend({}, sale));
            });
          } else {
            $scope.salesFiles.forEach(function(sale) {
              var count = 0;
              $scope.includeSalesFiles.forEach(function(include) {
                if(sale._id == include._id) {
                  count++;
                }
              });
              if(count == 0) {
                $scope.includeSalesFiles.push(angular.extend({}, sale));
              }
            });
          }
          removeSelectedFromExcluded();
          setSalesToPeriod();
          SelectAll.deselect(e)
        }

        $scope.includeSelectedSales = function() {
          Loader.load();
          var num = 0,
            count = 0;
          var selectedSales = [];
          $scope.salesFiles.forEach(function(sale) {
            if(sale.selected) {
              if($scope.includeSalesFiles.length > 0) {
                $scope.includeSalesFiles.forEach(function(include) {
                  if(sale._id != include._id) {
                    count++;
                  } else {
                    num++;
                  }
                });
                if(num == 0) {
                  sale.selected = false;
                  selectedSales.push(angular.extend({}, sale));
                }
              } else {
                count++;
                sale.selected = false;
                selectedSales.push(angular.extend({}, sale));
              }
            }
          });
          if(num > 0) {
            Loader.error('This file has already been selected');
          } else if(count > 0) {
            selectedSales.forEach(function(sale) {
              $scope.includeSalesFiles.push(angular.extend({}, sale));
              Loader.complete();
            });
          } else {
            Loader.error('Choose at Least One Sales File');
          }
          removeSelectedFromExcluded();
          setSalesToPeriod();
        }

        function removeSelectedFromExcluded() {
        	$scope.includeSalesFiles.forEach(function(sale) {
        		$scope.salesFiles.forEach(function(excludedSale) {
        			// Needs to match ID as objects are not the same
        			if(sale._id == excludedSale._id) {
        				var index = $scope.salesFiles.indexOf(excludedSale);
		        		$scope.salesFiles.splice(index, 1);
        			}
        		});
        	});
        }

        function setSalesToPeriod() {
        	$scope.period.salesFilesIds = $scope.includeSalesFiles.map(function(sale) { return sale._id });
        }
      }
    }
  }]);
