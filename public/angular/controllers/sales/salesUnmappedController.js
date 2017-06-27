angular.module('Curve')
	.controller('salesUnmappedController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Notification', 'Territories', 'Settings', 'Currencies', 'Sales', function($scope, $routeParams, Session, Pagination, Notification, Territories, Settings, Currencies, Sales) {
		var controller = this;
		$scope.saleDatePopup = false;
		$scope.transactionDatePopup = false;
		$scope.territories = Territories;
		$scope.currencies = Currencies;
		$scope.types = ["Sale", "Return"];
		$scope.sales = [];
		$scope.searchText = null;
		this.filter = function(params, callback) {
			params.status = 'Incomplete';
			Sales.all(params, function(response) { 
				if(response.status == 200) {
					$scope.sales = response.data.sales;
					$scope.totalPages = response.data.meta.totalPages;
					$scope.currentPage = response.data.meta.currentPage;
					$scope.total = response.data.meta.total;
					$scope.pages = Pagination.createArray(response.data.meta.currentPage, response.data.meta.totalPages);
					if(callback) { callback(); }
				} else {
					Notification.error(response.data.message);
				}
			});    
		};
		$scope.getSortedData = function(orderBy) {
			if ( $scope.orderBy == orderBy ) {
				$scope.orderDir = ( $scope.orderDir == 'asc' ) ? 'desc' : 'asc';
			}
			$scope.orderBy = orderBy;
			controller.filter({ text: $scope.searchText, orderBy: $scope.orderBy, orderDir: $scope.orderDir });
		};
		$scope.whatClassIsIt= function(field){
			if ($scope.orderBy == field) { 
				if ( $scope.orderDir == 'asc' ) {
					return 'sorting_asc';
				} else {
					return 'sorting_desc'; 
				} 
			} else {
				return 'sorting';
			}
		}
		$scope.search = function() {
			controller.filter( $scope.sale, function() {
				Notification.success('Sales Successfully Searched');
			});
		};
		$scope.changePage = function(page) {
			controller.filter({ name: $scope.sale, page: page });
		};

		Settings.getSettings()
			.then(function(settings){
				angular.extend($scope, settings);
			});

		$scope.groupFind = function(territory){
			return territory.continent;
		}

		$scope.openSaleDatePopup = function() {
			$scope.saleDatePopup = true; 
		} 
		$scope.openTransactionDatePopup = function() {
			$scope.transactionDatePopup = true;
		}

		$scope.update = function(){
			$('#modalEditFields').modal('hide');
			$('#modalEditFields').on('hidden.bs.modal', function() {
				Sales.update($scope.sale._id, $scope.sale, function(response) {
					if(response.status == 200) {
						$scope.sale = response.data;
						Notification.success('Sale successfully saved');
					} else {
						Notification.error('Error saving sale, please try again or contact support');
					}
				});	
			});		
		}

		// Load all sales on page load
		this.filter({});
	}]); 