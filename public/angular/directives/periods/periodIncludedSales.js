angular.module('Curve')
	.directive("periodIncludedSales", function(Loader){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/periods/period-included-sales.html",
			scope: true,
			link: function($scope){

			    $scope.excludeAllSales = function(){
			    	$scope.includeSalesFiles.splice(0, $scope.includeSalesFiles.length);
			    }

			    $scope.excludeSelectedSales = function(){
					Loader.load();
					var count = 0;
					var selectedSales = [];
					$scope.includeSalesFiles.forEach(function(include, index){
						if (include.selected){
							count++;
							include.selected = false;
							selectedSales.push(angular.extend({},index));
						}
					});
					var delta = 0;
					if (count > 0){
						selectedSales.forEach(function(index){
							$scope.includeSalesFiles.splice(index-delta, 1); 
							delta++;
						});
						Loader.complete();
					} else {
						Loader.error('Choose at least one position');
					}
			    }

			    $scope.includeAllSales = function(){
			    	if ($scope.includeSalesFiles.length == 0){
				    	$scope.salesFiles.forEach(function(sale){
							$scope.includeSalesFiles.push(angular.extend({},sale));    		
				    	});
			    	} else {
			    		$scope.salesFiles.forEach(function(sale){
			    			var count = 0;
			    			$scope.includeSalesFiles.forEach(function(include){
			    				if (sale._id == include._id){
			    					count++;
			    				}
			    			});
							if (count == 0){
								$scope.includeSalesFiles.push(angular.extend({},sale));
							}
			    		});
			    	}
			    }

			    $scope.includeSelectedSales = function(){
					Loader.load();
					var num = 0, count = 0;
					var selectedSales = [];
					$scope.salesFiles.forEach(function(sale){
						if (sale.selected){
							if ($scope.includeSalesFiles.length > 0){
								$scope.includeSalesFiles.forEach(function(include){
									if (sale._id != include._id){
										count++;
									} else {
										num++;
									}
								});
								if (num == 0){
									sale.selected = false;
									selectedSales.push(angular.extend({},sale));
								}
							} else {
								count++;
								sale.selected = false;
								selectedSales.push(angular.extend({},sale));						
							}
						}
					});
					if (num > 0){
						Loader.error('This file has already been selected');
					} else if (count > 0){
						selectedSales.forEach(function(sale){
							$scope.includeSalesFiles.push(angular.extend({},sale));
							Loader.complete();
						});
					} else {
						Loader.error('Choose at least one position');
					}
			    }
			}
		}
	}); 
