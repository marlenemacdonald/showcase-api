var controller = angular.module('Ball.controllers', [])

.controller('BallController', ['$scope', 'PhraseService', 'BallService', function($scope, PhraseService, BallService){

	$scope.content = PhraseService.getPhrases();

	$scope.getContent = function(event){
		console.log("ball clicked");
		$scope.content = PhraseService.getPhrases();

		$scope.x = BallService.getRandomNum();
		console.log($scope.x);
	
	}

}])

.controller('PhraseController', ['$scope', 'PhraseService', function($scope, PhraseService){

	$scope.content = (PhraseService.getPhrases());

    $scope.update = function() {
       
       console.log(this.content);
     };
     
}]);


