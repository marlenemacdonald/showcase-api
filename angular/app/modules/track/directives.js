var directives = angular.module('Track.directives', [])

/**
*	directive to wrap the "highcharts-ng" chart
*	this directive adds the "type" functionality, 
*	as well as exposes the refresh functionality
**/
.directive('chartWrapper', ['ChartService', function(ChartService){

	function capitalizeWord(word){

		return word.charAt(0).toUpperCase() + word.substring(1);
	}

	return {
		restrict: 'E',
		template: '<highchart config="chartConfig"></highchart>',
		controller: ['$scope', '$attrs','$element', function($scope, $attrs, $element){
		
			$scope.refresh = function(){	

				var configFn, typeCapitalized;

				typeCapitalized = capitalizeWord($attrs.type);

				configFn = ChartService['get' + typeCapitalized + 'Config'];


				$scope.chartConfig = configFn.call(ChartService);
			};

			ChartService.employChart($element);

		}]
	}
}]);