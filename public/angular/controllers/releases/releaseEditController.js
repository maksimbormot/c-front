angular.module('Curve')
	.controller('releaseEditController', ['$scope', '$routeParams', '$window', 'Session', 'Release', 'Notification', 'Track', 'Pagination', 'Settings', 'Loader',
		function($scope, $routeParams, $window, Session, Release, Notification, Track, Pagination, Settings, Loader) {
		var controller = this;
		$scope.release = { salesReturnsRights: [], costsRights: [], aliases: [] };
		$scope.formats = [];
		$scope.priceCategories = [];
		$scope.contracts = [];

		this.loadRelease = function() { 
			Loader.load();
			Release.get($routeParams.id, function(response) {
				if(response.status == 200) {
					console.log(response);
					$scope.release = response.data;
					Release.loadTracks($scope.release);
					$scope.release.releaseDate = new Date(response.data.releaseDate);
					Loader.complete();
				} else {
					Loader.error('Error loading release, please try again or contact support');
				}
			});
		}
		if($routeParams.id) {
			controller.loadRelease();
		}

		$(".sidebar-menu-item").removeClass('active');
		$(".sidebar-menu ul li.sidebar-menu-item span.icon-thumbnail").removeClass('bg-success');
		$(".sidebar-menu ul li.sidebar-menu-item ul.sub-menu li.sub-menu-item span.icon-thumbnail").removeClass('white');
		$(".sidebar-menu-item.catalogue").addClass('active');
		$(".sidebar-menu-item.catalogue").find("span.icon-thumbnail:first").addClass('bg-success');
		$(".release-item").find("span.icon-thumbnail").addClass('white');

		Settings.getSettings()
			.then(function(settings){
				$scope.priceCategories = settings.priceCategories;
				$scope.formats = settings.configurations;
			});		

		Settings.getContracts()
			.then(function(contracts){
				$scope.contracts = contracts;
			});	

		$scope.releaseDatePopup = false;

		$scope.openReleaseDatePopup = function() {
			$scope.releaseDatePopup = true;
		}    
		$scope.addSalesReturnsRights = function() {
			$scope.release.salesReturnsRights.push({});
		}
		$scope.deleteSalesReturnsRights = function(contract) {
			var index = $scope.release.salesReturnsRights.indexOf(contract);
			$scope.release.salesReturnsRights.splice(index, 1);
		}
		$scope.addCostsRights = function() {
			$scope.release.costsRights.push({});
		}
		$scope.deleteCostsRights = function(contract) {
			var index = $scope.release.costsRights.indexOf(contract);
			$scope.release.costsRights.splice(index, 1);
		}
		$scope.$watch('release.aliases', function(aliases) {
			$scope.displayAliases = []
			angular.forEach(aliases, function(alias) {
				$scope.displayAliases.push({ name: alias });
			});
		});
		$scope.addAlias = function() {
			$scope.displayAliases.push("");
			updateAliases();
		}
		$scope.deleteAlias = function(alias) {
			var index = $scope.displayAliases.indexOf(alias);
			$scope.displayAliases.splice(index, 1);
		}
		function updateAliases(callback) {
			$scope.release.aliases = []
			if($scope.displayAliases.length > 0) {
				angular.forEach($scope.displayAliases, function(alias) {
					$scope.release.aliases.push(alias.name);
					if($scope.release.aliases.length == $scope.displayAliases.length) {
						if(callback) { callback(); }
					}
				});
			} else {
				if(callback) { callback(); }
			}
		}
		// Tabs
		$scope.activeTab = "overview";
		$scope.setTab = function(value) {
			$scope.activeTab = value;
		}
		this.save = function() {
			Loader.load();	
			updateAliases(function() {
				if(!$scope.release._id) {
					Release.create($scope.release, function(response) {
						if(response.status == 200) {
							$window.location.href = "#/releases/" + response.data._id + "/edit";
							Loader.success('Release successfully created');
						} else {
							Loader.error('Error creating release, please try again or contact support');
						}
					})
					.catch(function(response){
						if(response.status == 400) {
							Loader.error('The object has not been saved.  ' + response.data.message);
						}
					});
				} else {
					Release.update($scope.release._id, $scope.release, function(response) {
						if(response.status == 200) {
							$scope.release = response.data;
							Release.loadTracks($scope.release); 
							$scope.release.releaseDate = new Date(response.data.releaseDate);
							Loader.success('Release successfully saved');
						} else {
							Loader.error('Error saving release, please try again or contact support');
						}
					})
					.catch(function(response){
						if(response.status == 400) {
							Loader.error('The object has not been saved.  ' + response.data.message);
						}
					});
				}
			});
		}
		$scope.save = function() {
			controller.save();
		}
		$scope.delete = function() {
			Loader.load();
			$('#deleteModal').modal('hide');
			$('#deleteModal').on('hidden.bs.modal', function() {
				Release.delete($scope.release._id, function(response) {
					if(response.status == 200) {
						$window.location.href = "#/releases";
						Loader.success('Release successfully deleted');
					} else {
						Loader.error('Error deleting client, please try again or contact support');
					}
				});
			});
		}
		// Tracks
		this.filterTracks = function(params, callback) {
			Loader.load();
			Track.all(params, function(response) {
				if(response.status == 200) {
					console.log(response.data.tracks);
					$scope.searchTracks = response.data.tracks;
					$scope.totalTrackPages = response.data.meta.totalPages;
					$scope.currentTrackPage = response.data.meta.currentPage;
					$scope.trackPages = Pagination.createArray(response.data.meta.currentPage, response.data.meta.totalPages);
					if(callback) { callback(); }
					Loader.complete();
				} else {
					Loader.error(response.data.message);
				}
			});
		}
		$scope.tracksSearch = function() {
			controller.filterTracks({ name: $scope.trackSearchText }, function() {
				Notification.success('Tracks Successfully Searched');
			});
		};
		$scope.changeTrackPage = function(page) {
			controller.filterTracks({ name: $scope.trackSearchText, page: page });
		};
		$scope.addTrack = function(track) {
			track.added = true;
			if(!$scope.release.trackIds) { $scope.release.trackIds = []; }
			$scope.release.trackIds.push(track._id);
			controller.save();
		}
		$scope.addTracks = function() {
			$scope.searchTracks.forEach(function(track) {
				if(!$scope.release.trackIds) { $scope.release.trackIds = []; }
				track.added = true;
				$scope.release.trackIds.push(track._id);
			});
			controller.save();
		}
		$scope.removeTracks = function() {
			var num = 0;
			$('#removeTracksModal').modal('hide');
			$('#removeTracksModal').on('hidden.bs.modal', function() {
				$scope.release.tracks.forEach(function(track, callback) {
					if(track.selected) { 
						num++;
						var index = $scope.release.trackIds.indexOf(track._id);
						delete $scope.release.trackIds[index];
					}
				});
				controller.save();
			});
			$('#removeTracksModal').on('hidden.bs.modal', function() {
				Notification.success(num + ' Tracks successfully removed from Release');
			});
		};
	}]);