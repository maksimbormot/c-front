angular.module('Curve')
	.controller('userEditController', ['$scope', '$window', '$routeParams', 'Session', 'Client', 'Parent', 'Payee', 'User', 'Notification', 'Loader',
		function($scope, $window, $routeParams, Session, Client, Parent, Payee, User, Notification, Loader) {
		var controller = this;
		$scope.client = {};
		$scope.user = {};
    $scope.userRole = Session.roleId ? "client" : Session.userType;
    $scope.newRole = {};
		$scope.selectedRole = null;
		$scope.id = Session.id;
		$scope.disableEditEmail = false;
		$scope.empty = [{}]; // empty value for dropdown

		if($routeParams.id){
      Loader.load();
			User.get($routeParams.id, function(response){
				if(response.status == 200){
					$scope.user = response.data.user;
					$scope.roles = $scope.empty.concat(response.data.users);
					$scope.disableEditEmail = true;
					controller.setUserRole()
					Loader.complete();
				}else {
					Loader.error('Error loading user, please try again or contact support');
				}
			})
		}else{
      User.get(Session.id, function(response){
				if(response.status == 200){
					$scope.currentUser = response.data.user;
					$scope.roles = $scope.empty.concat(response.data.users);
					$scope.disableEditEmail = false;
					Loader.complete();
				}else {
					Loader.error('Error loading user, please try again or contact support');
				}
			})
    }

		this.setUserRole = function(){
			$scope.selectedRole = $scope.roles.find(function(role){
				if(role._id && (role._id === $scope.user.clientId || role._id === $scope.user.parentId || role._id === $scope.user.payeeId )){
					return role
				}
			})
		}

		this.getUserData = function(){
			var data = {}
			data.email = $scope.user.email,
			data.internal = false;
			data.parentId = null;
			data.clientId = null;
			data.payeeId = null;
			if (Session.userType === 'internal'){
				if(!$scope.selectedRole){
					data.internal = true;
				} else {
					 data.parentId = $scope.selectedRole._id;
				}
				return data;
			}
			var roles = {
				'parent': {
						parent: 'parentId',
						child: 'clientId'
				},
				'client': {
						parent: 'clientId',
						child: 'payeeId'
				},
				'payee': {
					parent: 'payeeId',
					child: "payeeId"
				}
			}

			let active = roles[$scope.userRole] || roles['client'];
			if(!$scope.selectedRole){
				data[active.parent] = Session.roleId || Session[active.parent];
			} else {
				data[active.child] = $scope.selectedRole._id
			}
			return data;
		}

    $scope.changeRole = function(model){
			if(!model._id){
				$scope.selectedRole = null;
				return
			}
			$scope.selectedRole = model;
    }

		$scope.saveUserSettings = function(){
      if($routeParams.id){
				var data = controller.getUserData();
        User.update($scope.user._id, data, function(response){
					if(!response.data.success){
						Loader.error(response.data.message);
						return
					}
  				Loader.success('User successfully updated');
  			})

      }else{
				var data = controller.getUserData();
				User.create(data, function(response){
					if(!response.data.success){
						Loader.error(response.data.message);
						return
					}
					$window.location.href ="#/users"

				})
			}
		}
	}]);
