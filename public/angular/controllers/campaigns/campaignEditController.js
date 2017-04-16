angular.module('Curve')
	.controller('campaignEditController', ['$scope', '$routeParams', '$window', 'Session', 'Campaign', 'Parent', 'Notification', 'Release', 'Track', 'Work', 'Pagination', function($scope, $routeParams, $window, Session, Campaign, Parent, Notification, Release, Track, Work, Pagination) {
		var controller = this;
		$scope.campaign = {};
		this.setData = function(response) {
			$scope.campaign = response.data;
			Campaign.loadReleases($scope.campaign);
			Campaign.loadTracks($scope.campaign);
			Campaign.loadWorks($scope.campaign);
		};
		this.loadCampaign = function() {
			Campaign.get($routeParams.id, function(response) {
				if(response.status == 200) {
					controller.setData(response);
				} else {
					Notification.error('Error loading campaign, please try again or contact support');
				}
			});
		};
		if($routeParams.id) {
			controller.loadCampaign();
		};
		this.save = function() {
			if(!$scope.campaign._id) {
				Campaign.create($scope.campaign, function(response) {
					if(response.status == 200) {
						Notification.success('Campaign successfully created');
						$window.location.href = "#/campaigns/" + response.data._id + "/edit"
					} else {
						Notification.error('Error creating campaign, please try again or contact support');
					}
				});
			} else {
				Campaign.update($scope.campaign._id, $scope.campaign, function(response) {
					if(response.status == 200) {
						controller.setData(response);
						Notification.success('Campaign successfully saved');
					} else {
						Notification.error('Error saving campaign, please try again or contact support');
					}
				});
			}
		};
		$scope.save = function() {
			controller.save();
		};
		$scope.delete = function() {
			$('#deleteModal').modal('hide');
			$('#deleteModal').on('hidden.bs.modal', function() {
				Campaign.delete($scope.campaign._id, function(response) {
					if(response.status == 200) {
						Notification.success('Campaign successfully deleted');
						$window.location.href = "#/campaigns"
					} else {
						Notification.error('Error deleting client, please try again or contact support');
					}
				});
			});
		};

		// Releases
		this.filterReleases = function(params, callback) {
			Release.all(params, function(response) {
				if(response.status == 200) {
					$scope.searchReleases = response.data.releases;
					$scope.totalReleasePages = response.data.meta.totalPages;
					$scope.currentReleasePage = response.data.meta.currentPage;
					$scope.releasePages = Pagination.createArray(response.data.meta.currentPage, response.data.meta.totalPages);
					if(callback) { callback(); }
				} else {
					Notification.error(response.data.message);
				}
			});
		}
		$scope.releasesSearch = function() {
			controller.filterReleases({ text: $scope.releaseSearchText }, function() {
				Notification.success('Releases Successfully Searched');
			});
		};
		$scope.changeReleasePage = function(page) {
			controller.filterReleases({ text: $scope.releaseSearchText, page: page });
		};
		$scope.addRelease = function(release) {
			release.added = true;
			$scope.campaign.releaseIds.push(release._id);
			controller.save();
		};
		$scope.addReleases = function() {
			$scope.searchReleases.forEach(function(release) {
				release.added = true;
				$scope.campaign.releaseIds.push(release._id);
			});
			controller.save();
		};
		$scope.removeReleases = function() {
			var num = 0;
			$('#removeReleasesModal').modal('hide');
			$('#removeReleasesModal').on('hidden.bs.modal', function() {
				$scope.campaign.releases.forEach(function(release, callback) {
					if(release.selected) { 
						num++;
						var index = $scope.campaign.releaseIds.indexOf(release._id);
						delete $scope.campaign.releaseIds[index];
					}
				});
				controller.save();
			});
			$('#removeReleasesModal').on('hidden.bs.modal', function() {
				Notification.success(num + ' Releases successfully removed from Campaign');
			});
		};

		// Tracks
		this.filterTracks = function(params, callback) {
			Track.all(params, function(response) {
				if(response.status == 200) {
					console.log(response.data.tracks);
					$scope.searchTracks = response.data.tracks;
					$scope.totalTrackPages = response.data.meta.totalPages;
					$scope.currentTrackPage = response.data.meta.currentPage;
					$scope.trackPages = Pagination.createArray(response.data.meta.currentPage, response.data.meta.totalPages);
					if(callback) { callback(); }
				} else {
					Notification.error(response.data.message);
				}
			});
		}
		$scope.tracksSearch = function() {
			controller.filterTracks({ text: $scope.trackSearchText }, function() {
				Notification.success('Tracks Successfully Searched');
			});
		};
		$scope.changeTrackPage = function(page) {
			controller.filterTracks({ text: $scope.trackSearchText, page: page });
		};
		$scope.addTrack = function(track) {
			track.added = true;
			$scope.campaign.trackIds.push(track._id);
			controller.save();
		}
		$scope.addTracks = function() {
			$scope.searchTracks.forEach(function(track) {
				track.added = true;
				$scope.campaign.trackIds.push(track._id);
			});
			controller.save();
		}
		$scope.removeTracks = function() {
			var num = 0;
			$('#removeTracksModal').modal('hide');
			$('#removeTracksModal').on('hidden.bs.modal', function() {
				$scope.campaign.tracks.forEach(function(track, callback) {
					if(track.selected) { 
						num++;
						var index = $scope.campaign.trackIds.indexOf(track._id);
						delete $scope.campaign.trackIds[index];
					}
				});
				controller.save();
			});
			$('#removeTracksModal').on('hidden.bs.modal', function() {
				Notification.success(num + ' Tracks successfully removed from Campaign');
			});
		};

		// Works
		this.filterWorks = function(params, callback) {
			Work.all(params, function(response) {
				if(response.status == 200) {
					$scope.searchWorks = response.data.works;
					$scope.totalWorkPages = response.data.meta.totalPages;
					$scope.currentWorkPage = response.data.meta.currentPage;
					$scope.workPages = Pagination.createArray(response.data.meta.currentPage, response.data.meta.totalPages);
					if(callback) { callback(); }
				} else {
					Notification.error(response.data.message);
				}
			});
		}
		$scope.worksSearch = function() {
			controller.filterWorks({ text: $scope.workSearchText }, function() {
				Notification.success('Works Successfully Searched');
			});
		};
		$scope.changeWorkPage = function(page) {
			controller.filterWorks({ text: $scope.workSearchText, page: page });
		};
		$scope.addWork = function(work) {
			work.added = true;
			$scope.campaign.workIds.push(work._id);
			controller.save();
		}
		$scope.addWorks = function() {
			$scope.searchWorks.forEach(function(work) {
				work.added = true;
				$scope.campaign.workIds.push(work._id);
			});
			controller.save();
		}
		$scope.removeWorks = function() {
			var num = 0;
			$('#removeWorksModal').modal('hide');
			$('#removeWorksModal').on('hidden.bs.modal', function() {
				$scope.campaign.works.forEach(function(work, callback) {
					if(work.selected) { 
						num++;
						var index = $scope.campaign.workIds.indexOf(work._id);
						delete $scope.campaign.workIds[index];
					}
				});
				controller.save();
			});
			$('#removeWorksModal').on('hidden.bs.modal', function() {
				Notification.success(num + ' Works successfully removed from Campaign');
			});
		};
	}]);