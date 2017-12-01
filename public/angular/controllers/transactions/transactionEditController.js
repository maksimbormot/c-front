angular.module('Curve')
	.controller('transactionEditController', ['$scope', '$routeParams', '$window', 'Session', 'Transaction', 'Loader',
		function($scope, $routeParams, $window, Session, Transaction, Loader) {
		var controller = this;
		$scope.transaction = {};
		$scope.contractId = $routeParams.contractId;
		$scope.transaction.contractId = $routeParams.contractId;
		if($routeParams.id) {
			Loader.load();
			Transaction.get($routeParams.id, function(response) {
				if(response.status == 200) {
					$scope.transaction = response.data;
					if(response.data.date) { $scope.transaction.date = new Date(response.data.date); }
					Loader.complete();
				} else {
					Loader.error('Error loading transaction, please try again or contact support');
				}
			});
		}

		$scope.datePopup = false;

		$scope.openDatePopup = function() {
			$scope.datePopup = true;
		}    

		$scope.save = function() {
			Loader.load();
			if(!$scope.transaction._id) {
					Transaction.create($scope.transaction, function(response) {
						if(response.status == 200) {
							$window.location.href = "#/contracts/" + $scope.contractId + "/edit";
							Loader.success('Transaction successfully created');
						} else {
							Loader.error('Error creating transaction, please try again or contact support');
						}
					})
					.catch(function(response){
						Loader.error('The object has not been saved.  ' + response.data.message);
					});
				} else {
					Transaction.update($scope.transaction._id, $scope.transaction, function(response) {
						if(response.status == 200) {
							$window.location.href = "#/contracts/" + $scope.contractId + "/edit";
							Loader.success('Transaction successfully saved');
						} else {
							Loader.error('Error saving transaction, please try again or contact support');
						}
					})
					.catch(function(response){
						Loader.error('The object has not been saved.  ' + response.data.message);
					});
				}
			
		}
		$scope.delete = function() {
			Loader.load();
			$('#deleteModal').modal('hide');
			$('#deleteModal').on('hidden.bs.modal', function() {
				Transaction.delete($scope.transaction._id, function(response) {
					if(response.status == 200) {
						$window.location.href = "#/contracts/" + $scope.contractId + "/edit";
						Loader.success('Transaction successfully deleted');
					} else {
						Loader.error('Error deleting client, please try again or contact support');
					}
				});
			});
		}
	}]);