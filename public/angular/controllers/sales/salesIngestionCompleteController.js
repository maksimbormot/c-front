angular.module('Curve')
	.controller('salesIngestionCompleteController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Notification', 'Territories', 'Currencies', 'Settings', 'SalesFile', 'Sales', 'Loader',
		function($scope, $routeParams, Session, Pagination, Notification, Territories, Currencies, Settings, SalesFile, Sales, Loader) {
		var controller = this;
		$scope.saleDatePopup = false;
		$scope.transactionDatePopup = false;
		$scope.territories = Territories;
		$scope.currencies = Currencies;
		$scope.types = ["Sale", "Return"];
		$scope.status = ["Complete", "Invalid"];
		$scope.filter = {};
		$scope.sales = [];
		$scope.searchText = null;
		$scope.filterSales = [];
		$scope.releases = [];
		$scope.tracks = [];
		$scope.works = [];

		this.filter = function(params, callback) { 
			Loader.load();
			Sales.all(params, function(response) {   
				if(response.status == 200) {
					$scope.sales = response.data.sales;
					$scope.totalPages = response.data.meta.totalPages;
					$scope.currentPage = response.data.meta.currentPage;
					$scope.total = response.data.meta.total;
					$scope.pages = Pagination.createArray(response.data.meta.currentPage, response.data.meta.totalPages);
					if(callback) { callback(); }
					Loader.complete();
				} else {
					Loader.error(response.data.message);
				}
			});    
		};

	    // Load Template if ID exists
	    if($routeParams.id) {
	      Loader.load();
	      SalesFile.get($routeParams.id, function(response) {
	        if(response.status == 200) {
	          $scope.salesFile = response.data;
	          $scope.salesFile.saleDate = new Date($scope.salesFile.saleDate);
	          $scope.salesFile.transactionDate = new Date($scope.salesFile.transactionDate);
	          Loader.complete();
	        } else {
	          Loader.error('Error loading template, please try again or contact support');
	        }
	      });
	    };
    
		$scope.getSortedData = function(orderBy) {
			if ( $scope.orderBy == orderBy ) {
				$scope.orderDir = ( $scope.orderDir == 'asc' ) ? 'desc' : 'asc';
			}
			$scope.orderBy = orderBy;
			controller.filter({ text: $scope.searchText, orderBy: $scope.orderBy, orderDir: $scope.orderDir });
			Loader.complete();
		};
		$scope.whatClassIsIt = function(field){
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
			$scope.filter.salesFileId = $scope.salesFile._id;
			controller.filter($scope.filter, function() {
				$scope.filterSales = $scope.sales;
				Loader.success('Sales Successfully Searched');
			});
		};
		$scope.changePage = function(page) {
			controller.filter({ name: $scope.sale, page: page });
		};

		Settings.getSettings()
			.then(function(settings){
				angular.extend($scope, settings);
			});
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

		$scope.groupFind = function(territory){
			return territory.continent;
		}

		$scope.openSaleDatePopup = function() {
			$scope.saleDatePopup = true; 
		} 
		$scope.openTransactionDatePopup = function() {
			$scope.transactionDatePopup = true;
		} 

		$scope.editSingle = function(){
			$scope.selected = false;
			$scope.filtered = false;
			$scope.single = true;			
		}
		$scope.editSelected = function(){
			$scope.single = false;
			$scope.filtered = false;
			$scope.selected = true;			
		}
		$scope.editFiltered = function(){
			$scope.single = false;
			$scope.selected = false;
			$scope.filtered = true;			
		}

		$scope.updateSingle = function(){
			Loader.load();
			$('#modalEditFields').modal('hide');
			$('#modalEditFields').on('hidden.bs.modal', function() {
				Sales.update($scope.sale._id, $scope.sale, function(response) {
					if(response.status == 200) {
						$scope.sale = response.data;
						Loader.success('Sale successfully saved');
					} else {
						Loader.error('Error saving sale, please try again or contact support');
					}
				});	
			});		
		}

		$scope.updateSelected = function() { 
			Loader.load();
			var num = 0
			$scope.sales.forEach(function(sale, callback) {
				if(sale.selected) { 
					Sales.update($scope.sale._id, $scope.sale, function(response) {
						if(response.status == 200) {
							num++;
							$scope.sale = response.data;
							$('#modalEditFields').modal('hide');
							Loader.complete();
						}
					});
				}
			});
			$('#modalEditFields').on('hidden.bs.modal', function() {
				Loader.success(num + ' Sales successfully saved');
			});
		}

		$scope.updateFiltered = function(){
			Loader.load();
			var num = 0
			$scope.filterSales.forEach(function(sale, callback) {
				Sales.update($scope.sale._id, $scope.sale, function(response) {
					if(response.status == 200) {
						num++;
						$scope.sale = response.data;
						$('#modalEditFields').modal('hide');
						Loader.complete();
					}
				});
			});
			$('#modalEditFields').on('hidden.bs.modal', function() {
				Loader.success(num + ' Sales successfully saved');
			});
		}

		// Load all sales on page load
		this.filter({});

	}]); 