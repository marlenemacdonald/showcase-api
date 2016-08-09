var services = angular.module('Count.services', [])

.factory('CountService', [function(){
	return {
		increment: function(value, increment){
			var randomNum = Math.random() * 100;

			randomNum += 1000;

			randomNum = randomNum/20;

			return value + randomNum + increment;
		}
	}
}]);