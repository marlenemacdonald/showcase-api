
var services = angular.module('Ball.services', [])


.factory('PhraseService', function(){
	return{
		phrases: [
		'It is certain', 
				'It is decidedly so',
				'Without a doubt',
				'Yes, definitely',
				'You may rely on it',
				'As I see it, yes',
				'Most likely',
				'Outlook good',
				'Yes',
				'Signs point to yes',
				'Reply hazy try again',
				'Ask again later',
				'Better not tell you now',
				'Cannot predict now',
				'Concentrate and ask again',
				'Don\'t count on it',
				'My reply is no',
				'My sources say no',
				'Outlook not so good',
				'Very doubtful'
		],

		getPhrases: function(){
			return this.phrases;
		}

	};

})

.factory('BallService', [function(){
	return{
		getRandomNum: function(){
		var randomNum = {};
			randomNum = Math.floor(Math.random() * 20);
			return randomNum;
		}
	}
				
}]);



