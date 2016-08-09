var controller = angular.module('Count.controllers', [])

.controller('FirstCountController', ['$scope', 'CountService', function($scope, CountService){

	$scope.value = 30;

	$scope.changeValue = function(event){
		console.log("button clicked");

		$scope.value = CountService.increment($scope.value, 10);
	}

}])

.controller('SecondCountController', ['$scope', function($scope){

	$scope.value = 100;

	$scope.changeValue = function(event){
		console.log("button clicked");

		$scope.value += 30;
	}

}]);