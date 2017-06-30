angular.module('Curve')
	.controller('costEditController', ['$scope', '$routeParams', '$window', 'Session', 'Cost', 'Notification', 'Settings', 'Upload', '$timeout', function($scope, $routeParams, $window, Session, Cost, Notification, Settings, Upload, $timeout) {
		var controller = this;
		$scope.costsTypes = ["Gross Receipts","Net Receipts", "PPD"];
		$scope.releases = [];
		$scope.tracks = [];
		$scope.works = [];
		$scope.contracts = []; 
		$scope.token = '?applicationToken=12345&token=' + Session.token;
		$scope.cost = { fileName: null};

		// Load Cost if ID exists
		if($routeParams.id) {
			Cost.get($routeParams.id, function(response) {
				if(response.status == 200) {
					$scope.cost = response.data;
				} else { 
					Notification.error('Error loading cost, please try again or contact support');
				}
			}); 
		};

		Settings.getReleases()
			.then(function(releases){
				$scope.releases = releases;
			});	
		Settings.getTracks()
			.then(function(tracks){
				$scope.tracks = tracks;
			});	
		Settings.getWorks()
			.then(function(works){ 
				$scope.works = works;
			});	
		Settings.getContracts()
			.then(function(contracts){
				$scope.contracts = contracts;
			});	 

	    $scope.upload = function (file) {
	    	if($scope.cost._id){
				return Upload.upload({
			      url: 'http://localhost:8081/costs/upload'+ $scope.token,
			      method: 'POST',
			      data: {
			      	file: file, 
			      	cost_id: $scope.cost._id
			      }
			    })
			    .then(function(resp){
			    	$scope.cost.file = resp.data.url;
			    	return resp;
			    })
			}  
	    };

		$scope.save = function() { 
			if(!$scope.cost._id) {
				Cost.create($scope.cost, function(response) {
					if(response.status == 200) {
						$scope.cost._id = response.data._id;
						$scope.upload($scope.file)
						.then(function(){
							Notification.success('Cost successfully created');
							$window.location.href = "#/costs/" + response.data._id + "/edit"
						});
					} else {
						Notification.error('Error creating cost, please try again or contact support');
					}
				});
			} else {
				Cost.update($scope.cost._id, $scope.cost, function(response) {
					if(response.status == 200) {
						$scope.cost = response.data;
						Notification.success('Cost successfully saved');
					} else {
						Notification.error('Error saving cost, please try again or contact support');
					}
				});
			}
		};
		$scope.delete = function() {
			$('#deleteModal').modal('hide');
			$('#deleteModal').on('hidden.bs.modal', function() {
				Cost.delete($scope.cost._id, function(response) {
					if(response.status == 200) {
						Notification.success('Cost successfully deleted');
						$window.location.href = "#/costs"
					} else {
						Notification.error('Error deleting cost, please try again or contact support');
					}
				});
			});
		};
	}]);