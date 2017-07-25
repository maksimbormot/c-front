angular.module('Curve')
	.controller('searchController', ['$scope', '$rootScope', '$cookies', 'Session', 'Loader', 'Search',
		function($scope, $rootScope, $cookies, Session, Loader, Search) {
		var controller = this;
		$scope.releases = []; 
		$scope.tracks = [];
		$scope.works = [];
		$scope.contracts = [];
		
		$scope.searchText = null;
		this.filter = function(text, callback) {
			Loader.load();
			Search.get(text, function(result){
				$scope.releases = result.data.releases;
				$scope.tracks = result.data.tracks;
				$scope.works = result.data.works;
				$scope.contracts = result.data.contracts;
				Loader.complete();
			});
		};

		$scope.search = function(){
			var count = $("#overlay-search").val().length;
			if (count > 0){
				$scope.showResults = true;
			}
			controller.filter($scope.searchText);
		}

		$scope.closeOverlay = function(){
			$rootScope.isOpenOverlay = false;
		}

	}]);