var directives = angular.module('Count.directives', [])

.directive('customButton', function(){
	return {
		restrict: 'E',
		template: '<button id="test">{{text}}</button>',
		controller: ['$scope', '$element', function($scope, $element){

			//$scope.text = "Custom Button from $scope";


			$scope.destruct = function(){
				angular.element($element).remove();

			};

			window.customDir = $element;
		}],
		link: function(scope){
			scope.text = "Custom button from $scope";
		}

	}
});