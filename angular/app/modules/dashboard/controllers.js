var controllers = angular.module('Dashboard.controllers', [])

.controller('HeaderController', ['$scope', '$state', function($scope, $state){

	$scope.title = capitalizeFirstLetter($state.current.name.replace('dashboard.basic.', ''));

	function capitalizeFirstLetter(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
}])

.controller('NavController', ['$scope', 'UserService', function($scope, UserService){

	$scope.name = UserService.getUser().firstName + " " + UserService.getUser().lastName;

	$scope.toggleNav = function(){
		$("#wrapper").toggleClass("toggled");
        $(".navbar-toggle").toggleClass("collapsed");
	};

}]);