var controllers = angular.module('User.controllers', [])

.controller('LoginController', ['$scope', 'UserService', '$state', function($scope, UserService, $state){

	//console.log($scope.username);
	$scope.loginHandler = function(){
		UserService.login($scope.username, $scope.password).then(function(){
			//login success
			$state.go('dashboard.basic.start');
		}, function(){
			//loginfailed
		});
	};
}])

.controller('SignupController', ['$scope', 'UserService', '$state', function($scope, UserService, $state){

	$scope.signupHandler = function(){
		UserService.signup($scope.username, $scope.firstName, $scope.lastName, $scope.password).then(function(){
			//signup success
			$state.go('login');
		}, function(){
			console.log("FAIL!!!");
			//signup failed
		});
	};
}])

.controller('ProfileController', ['$scope', 'UserService', function($scope, UserService, $state){

	$scope.user = UserService.getUser();

	$scope.profileHandler = function(){
		UserService.profile($scope.user).then(function(){
			//update profile success
			
		}, function(){
			console.log("FAIL!!!");
			//update profile failed
		});
	};

}]);