angular.module('Curve')
	.directive("periodIncludedCosts", function(Loader){
		return {
			restrict: "E",
			templateUrl: "angular/templates/directives/periods/period-included-costs.html",
			scope: true,
			link: function($scope){

				$scope.excludeAllCosts = function(){
			    	$scope.includeCosts.splice(0, $scope.includeCosts.length);
			    }

			    $scope.excludeSelectedCosts = function(){
					Loader.load();
					var num = 0, count = 0;
					var selectedCosts = [];
					$scope.includeCosts.forEach(function(include, index){
						if (include.selected){
							count++;
							include.selected = false;
							selectedCosts.push(angular.extend({},index));
						}
					});
					var delta = 0;
					if (count > 0){
						selectedCosts.forEach(function(index){
							$scope.includeCosts.splice(index-delta, 1);
							delta++;
						});
						Loader.complete();
					} else {
						Loader.error('Choose at least one position');
					}
			    }

			    $scope.includeAllCosts = function(){
			    	if ($scope.includeCosts.length == 0){
				    	$scope.costs.forEach(function(cost){
							$scope.includeCosts.push(angular.extend({},cost));    		
				    	});
			    	} else {
			    		$scope.costs.forEach(function(cost){
			    			var count = 0;
			    			$scope.includeCosts.forEach(function(include){
			    				if (cost._id == include._id){
			    					count++;
			    				}
			    			});
							if (count == 0){
								$scope.includeCosts.push(angular.extend({},cost));
							}
			    		});
			    	}
			    }

			    $scope.includeSelectedCosts = function(){
					Loader.load();
					var num = 0, count = 0;
					var selectedCosts = [];
					$scope.costs.forEach(function(cost){
						if (cost.selected){
							if ($scope.includeCosts.length > 0){
								$scope.includeCosts.forEach(function(include){
									if (cost._id != include._id){
										count++;
									} else {
										num++;
									}
								});
								if (num == 0){
									cost.selected = false;
									selectedCosts.push(angular.extend({},cost));
								}
							} else {
								count++;
								cost.selected = false;
								selectedCosts.push(angular.extend({},cost));						
							}
						}
					});
					if (num > 0){
						Loader.error('This file has already been selected');
					} else if (count > 0){
						selectedCosts.forEach(function(cost){
							$scope.includeCosts.push(angular.extend({},cost));
							Loader.complete();
						});
					} else {
						Loader.error('Choose at least one position');
					}
			    }

			}
		}
	}); 