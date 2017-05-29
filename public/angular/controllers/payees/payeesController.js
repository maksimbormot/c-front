angular.module('Curve')
	.controller('payeesController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Payee', 'Notification', 'FileSaver', function($scope, $routeParams, Session, Pagination, Payee, Notification, FileSaver) {
		var controller = this;
		$scope.payees = [];
		$scope.searchText = null;
		this.filter = function(params, callback) {
			Payee.all(params, function(response) {
				if(response.status == 200) {
					$scope.payees = response.data.payees;
					$scope.totalPages = response.data.meta.totalPages;
					$scope.currentPage = response.data.meta.currentPage;
					$scope.pages = Pagination.createArray(response.data.meta.currentPage, response.data.meta.totalPages);
					if(callback) { callback(); }
				} else {
					Notification.error(response.data.message);
				}
			});
		};
		$scope.search = function() {
			controller.filter({ text: $scope.searchText }, function() {
				Notification.success('Payees Successfully Searched');
			});
		};
		$scope.changePage = function(page) {
			controller.filter({ text: $scope.searchText, page: page });
		};
		$scope.deleteSelected = function() {
			var num = 0
			$scope.payees.forEach(function(payee, callback) {
				if(payee.selected) { 
					Payee.delete(payee._id, function(response) {
						if(response.status == 200) {
							num++;
							var index = $scope.payees.indexOf(payee);
							$scope.payees.splice(index, 1);
							$('#deleteModal').modal('hide');
						}
					});
				}
			});
			$('#deleteModal').on('hidden.bs.modal', function() {
				Notification.success(num + ' Payees successfully deleted');
			});
		}
		$scope.import = function() {
			Payee.import($scope.importFile, function(response) {
				if(response.status == 200) {
					$('#importModal').modal('hide');
					Notification.success('Payees successfully imported');
				} else if(response.status == 400) {
					$scope.importErrors = response.data.errors;
				} else {

				}
			});
		}
		$scope.export = function() {
			Payee.export(function(result) {
				if(result && result.status == 200) {
					var file = new Blob([result.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
					var name = "Payees Export.xlsx";
					FileSaver.saveAs(file, name);
				} else {
					console.error(result);
					Notification.error('Payees failed to export, please try again.');
				}
			});
		}
		// Load all payees on page load
		this.filter({});
	}]);