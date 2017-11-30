angular.module('Curve')
	.controller('usersController', ['$scope', '$routeParams', '$window', 'Pagination', 'Session', 'Client', 'Parent', 'Payee', 'User', 'Notification', 'Loader', 'SelectAll',
		function($scope, $routeParams, $window, Pagination, Session, Client, Parent, Payee, User, Notification, Loader, SelectAll) {
		var controller = this;
		$scope.client = {};
		$scope.selectedUser = {};
		$scope.users = [];
		$scope.userRole = Session.userType;
		this.filter = function(params, callback) {
			Loader.load();
			User.all(params, function(response) {
				if(response.status == 200) {
					$scope.users = response.data.users;
					$scope.totalPages = response.data.meta.totalPages;
					$scope.currentPage = response.data.meta.currentPage;
					$scope.pages = Pagination.createArray(response.data.meta.currentPage, response.data.meta.totalPages);
					Loader.complete();
				} else {
					Loader.error(response.data.message);
				}
			});
		};

		if(Session.id){
					this.filter({});

				$scope.userRole = Session.userType;
				$scope.id = Session.id;
		}

		$scope.saveUserSettings = function(){
			if($scope.user.password !== $scope.user.confirm){
				Loader.error('Passwords do not match');
				return
			}
			User.create({ email: $scope.user.email, password: $scope.user.password },function(response){
				$window.location.href ="#/users"
			})
		}

		$scope.deleteSelected = function() {
			Loader.load();
			var num = 0, count = 0;
			var selectedUsers = [];
			$scope.users.forEach(function(user, callback){
				if (user.selected){
					count++;
					selectedUsers.push(user);
				}
			});
			if (count > 0){
				selectedUsers.forEach(function(user){
					User.delete(user._id, function(response) {
						if(response.status == 200) {
							num++;
							var index = $scope.users.indexOf(user);
							$scope.users.splice(index, 1);
							if (count === num) {
								$('#deleteModal').modal('hide');
								Loader.complete();
							}
						}
					})
					.catch(function(response){
						Loader.error('The object has not been deleted.  ' + response.data.message);
					});
				});
				$('#deleteModal').one('hidden.bs.modal', function() {
					Loader.success(num + ' Users successfully deleted');
				});
			} else {
				$('#deleteModal').modal('hide');
				Loader.error('Choose at least one position');
			}
		}
		$scope.search = function() {
			controller.filter({ text: $scope.searchText }, function() {
				Loader.success('Tracks Successfully Searched');
			});
		};

		$scope.getSortedData = function(orderBy) {
			if ( $scope.orderBy == orderBy ) {
				$scope.orderDir = ( $scope.orderDir == 'asc' ) ? 'desc' : 'asc';
			}
			$scope.orderBy = orderBy;
			controller.filter({text: $scope.searchText, orderBy: $scope.orderBy, orderDir: $scope.orderDir});
			Loader.complete();
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
		$scope.changePage = function(page) {
			controller.filter({text: $scope.searchText, page: page });
		};
		$scope.selectAll = function(e){
			SelectAll.select(e)
		};
		$scope.import = function() {
			Loader.load();
			User.import($scope.importFile, function(response) {
				if(response.status == 200) {
					$('#importModal').modal('hide');
					Loader.success('Users successfully imported');
				} else if(response.status == 400) {
					$scope.importErrors = response.data.errors;
					Loader.complete();
				} else {
					Loader.complete();

				}
			});
		}
		$scope.export = function() {
			Loader.load();
			User.export(function(result) {
				if(result && result.status == 200) {
					var file = new Blob([result.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
					var name = "Users Export.xlsx";
					FileSaver.saveAs(file, name);
					Loader.complete();
				} else {
					console.error(result);
					Loader.error('Users failed to export, please try again.');
				}
			});
		}
	}]);
