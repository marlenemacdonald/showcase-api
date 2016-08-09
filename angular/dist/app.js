var app = angular.module('FirstApp', [
	'ui.router',
	'ngAnimate',
	'ngAria',
	'ngMaterial',
	'angular-loading-bar',
	'LocalStorageModule',
	'highcharts-ng',

	'Dashboard',
	'Count',
	'User',
	'Ball',
	'Track'
])


.config(['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider', function($stateProvider, $urlRouterProvider, localStorageServiceProvider){

	localStorageServiceProvider
	.setPrefix('myfirstapps')
	.setStorageType('localStorage');

	//Setup redirects or default paths
	$urlRouterProvider.when('', '/login');

	//Define states of application
	$stateProvider
	.state('login', {
		'url': '/login',
		'views': {
			'container': {
				'templateUrl': 'app/modules/user/views/view-login-container.html',
				'controller': 'LoginController'
			}
		}
	})
	.state('signup', {
		'url': '/signup',
		'views': {
			'container': {
				'templateUrl': 'app/modules/user/views/view-signup-container.html',
				'controller': 'SignupController'
			}
		}
	})
	.state('dashboard', {
		'abstract': true,
		'views': {
			'container': {
				'templateUrl': 'app/modules/dashboard/views/view-dashboard-container.html'
			},
			'nav@dashboard': {
				'templateUrl': 'app/modules/dashboard/views/view-dashboard-nav.html',
				'controller': 'NavController'
			}
		}
	})
	.state('dashboard.basic', {
		'abstract': true,
		'views': {
			'layout@dashboard': {
				'templateUrl': 'app/modules/dashboard/views/view-layout-basic.html'
			}
		}
	})
	.state('dashboard.full', {
		'abstract': true,
		'views': {
			'layout@dashboard': {
				'templateUrl': 'app/modules/dashboard/views/view-layout-full.html'
			}
		}
	})
	.state('dashboard.full.ball', {
		'url': '/ball',
		'views': {
			'main@dashboard.full': {
				'templateUrl': 'app/modules/ball/views/view-ball-main.html'
			}
		}
	})
	.state('dashboard.basic.start', {
		'url': '/start',
		'views': {
			'header@dashboard.basic': {
				'templateUrl': 'app/modules/dashboard/views/view-dashboard-header.html',
				'controller': 'HeaderController'
			},
			'main@dashboard.basic': {
				'template': 'Click <code>Counter</code> in nav on left to test out routing.'
			}
		}
	})
	.state('dashboard.basic.count', {
		'url': '/count',
		'views': {
			'header@dashboard.basic': {
				'templateUrl': 'app/modules/dashboard/views/view-dashboard-header.html',
				'controller': 'HeaderController'
			},
			'main@dashboard.basic': {
				'templateUrl': 'app/modules/count/views/view-count.html'
			}
		}
	})
	.state('dashboard.basic.profile', {
		'url': '/profile',
		'views': {
			'header@dashboard.basic': {
				'templateUrl': 'app/modules/dashboard/views/view-dashboard-header.html',
				'controller': 'HeaderController'
			},
			'main@dashboard.basic': {
				'templateUrl': 'app/modules/user/views/view-profile.html',
				'controller': 'ProfileController'
			}
		}
	})
	.state('dashboard.basic.phrases', {
		'url': '/phrases',
		'views': {
			'header@dashboard.basic': {
				'templateUrl': 'app/modules/dashboard/views/view-dashboard-header.html',
				'controller': 'HeaderController'
			},
			'main@dashboard.basic': {
				'templateUrl': 'app/modules/ball/views/view-phrases.html',
				'controller': 'PhraseController'
			}
		}
	});
}]);
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



var ball = angular.module('Ball', [
	'Ball.controllers',
	'Ball.services',
	'ngAnimate'
]);

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
var count = angular.module('Count', [
	'Count.controllers',
	'Count.services',
	'Count.directives'
]);
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
var dashboard = angular.module('Dashboard', [
	'Dashboard.controllers'
]);
var controller = angular.module('Track.controllers', [])

.controller('SummaryNavController', ['$scope', '$timeout', 'DataService', 'ChartService', function($scope, $timeout, DataService, ChartService){

	/**
	*	On click event handlers for the "Summary Nav" buttons
	**/

	$scope.totalHandler = function(){

			DataService.getGDPTotal().then(function(){
				ChartService.refreshCharts('gdpTotal');
			});
		
	}

	$scope.capitaHandler = function(){
		
	}

	$scope.growthHandler = function(){
		
	}

	//get data to set default state of the dashboard
	//$timeout(function(){
		$scope.totalHandler();
	//}, 1);

}])

.controller('TableCtrl', ['$scope', '$http', 'DataService', 'ChartService', function($scope, $http, DataService, ChartService){

	$http.get('assets/gdp-data-total-top20.json').success(function(data) {
		$scope.gdpData = data;

	});

	$scope.setSelected = function(country) {
        //DataService.custom = [country];
        DataService.setCustom(country);
				ChartService.refreshCharts('custom');
    };

}]);


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
angular.module( 'FirstApp' )
.filter( 'shortNumber', function() {
	return function( number ) {
	if ( number ) {
		abs = Math.abs( number );
	if ( abs >= Math.pow( 10, 12 ) ) {
		// trillion
		number = ( number / Math.pow( 10, 12 ) ).toFixed( 1 ) + "T";
	} 
	else if ( abs < Math.pow( 10, 12 ) && abs >= Math.pow( 10, 9 ) ) {
		// billion
		number = ( number / Math.pow( 10, 9 ) ).toFixed( 1 ) + "B";
	} 
	else if ( abs < Math.pow( 10, 9 ) && abs >= Math.pow( 10, 6 ) ) {
		// million
		number = ( number / Math.pow( 10, 6 ) ).toFixed( 1 ) + "M";
	} 
	else if ( abs < Math.pow( 10, 6 ) && abs >= Math.pow( 10, 3 ) ) {
		// thousand
		number = ( number / Math.pow( 10, 3 ) ).toFixed( 1 ) + "K";
	}
	return number;
	}
	};
} );
var track = angular.module('Track', [
	'Track.controllers',
	'Track.services',
	'Track.directives'
])

.config(['$stateProvider', function($stateProvider){

	$stateProvider
	.state('dashboard.quad', {
		'abstract': true,
		'views': {
			'layout@dashboard': {
				'templateUrl': 'app/modules/dashboard/views/view-layout-quad.html'
			}
		}
	})
	.state('dashboard.quad.summary', {
		'url': '/summary',
		'views': {
			'nav@dashboard.quad': {
				'templateUrl': 'app/modules/track/views/view-summary-nav.html',
				'controller': 'SummaryNavController'
			},
			'one@dashboard.quad': {
				'templateUrl': 'app/modules/track/views/view-summary-details.html'
			},
			'two@dashboard.quad': {
				'template': '<chart-wrapper type="bar"></chart-wrapper>'
			},
			'three@dashboard.quad': {
				'template': '<chart-wrapper type="pie"></chart-wrapper>'
			},
			'four@dashboard.quad': {
				'template': '<chart-wrapper type="spline"></chart-wrapper>'
			}
		}
	})
}])

.config(['$stateProvider', function($stateProvider){

	$stateProvider
	.state('dashboard.column', {
		'abstract': true,
		'views': {
			'layout@dashboard': {
				'templateUrl': 'app/modules/dashboard/views/view-layout-column.html'
			}
		}
	})
	.state('dashboard.column.toptwenty', {
		'url': '/toptwenty',
		'views': {
			'nav@dashboard.column': {
				'templateUrl': 'app/modules/track/views/view-summary-nav.html',
				'controller': 'SummaryNavController'
			},
			'one@dashboard.column': {
				'templateUrl': 'app/modules/track/views/view-table-data.html'

			},
			'two@dashboard.column': {
				'template': '<chart-wrapper type="bar"></chart-wrapper>'
			}
		}
	})
}]);
var services = angular.module('Track.services', [])

/**
* 	methods for operating on charts
* 	as well as storage for chart configs
**/
.factory('ChartService', ['DataService', function(DataService){
	return {
		charts: [],
		refreshCharts: function(dataName){

			this.currentData = DataService[dataName];

			for(var i = 0; i < this.charts.length; i++){
				if(!angular.element(this.charts[i][0]).scope()){

					continue;
				}

				angular.element(this.charts[i][0]).scope().refresh();

			}
		},
		employChart: function(chart){
			this.charts.push(chart);
		},


		getBarConfig: function(){

			var data = this.currentData;
				categories = [],
				series     = [];

				//Goal: build categories list (countries)
				//iterate through list of countries
			for(var x = 0; x < data.length; x++){
				var entry = data[x];

				categories.push(entry["Country Name"]);

			}
				//Goal:build series list (out of each possible year)
				//iterate through single country
				//to build series year list
			for(var p in data[0]){
				var value = data[0][p];

				if(typeof value == 'number'){
					var seriesObj = {
						name: p.substring(0, 4),
						data: []

					};

					series.push(seriesObj);
				}
			}

			//Goal: build GDP data points per year
			//iterate through newly created series obj
			for(var i = 0; i < series.length; i++){
				var seriesObj = series[i],
						 year = seriesObj.name;

						 //for every series obj, iterate through the countries
						 //and grab their gdp values pertaining to the year we are iterating
						 //(which equals i)
						 for(var c = 0; c < data.length; c++){
						 	var country = data[c],
						 		countryGDP = country[year + " " + "[YR" + year + "]"];

						 		seriesObj.data.push(countryGDP);
						 }

			}

			return {
			
			        options: {
			            chart: {
			            	type:'bar'
			            }

		        },
		        title: {
		            text: ' '
		        },
		        subtitle: {
		            text: ' '
		        },
		        xAxis: {
		            categories: categories,
		            title: {
		                text: null
		            }
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: '$USD (trillions)',
		                align: 'high'
		            },
		            labels: {
		                overflow: 'justify'
		            }
		        },
		        tooltip: {
		            valueSuffix: 'trillions'
		        },
		        plotOptions: {
		            bar: {
		                dataLabels: {
		                    enabled: true
		                }
		            }
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'top',
		            x: -40,
		            y: 80,
		            floating: true,
		            borderWidth: 1,
		            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
		            shadow: true
		        },
		        credits: {
		            enabled: false
		        },
		        series: series

    };
		},

		getPieConfig: function(){
			var data       = this.currentData,
		   		seriesData = [];

		   		for(var i = 0; i < data.length; i++){
		   			var country = data[i],
		   				countryProps = Object.keys(country),
		   				lastProperty = countryProps[countryProps.length - 1];

			   		seriesData.push({
			   			name: country["Country Name"],
			   			y: country[lastProperty]
			   		});
		   		}

			return {
			
			        options: {
			            chart: {
			            	type:'pie'
			            }

		        },	

        title: {
            text: ' '
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Countries',
            colorByPoint: true,
            data: seriesData
        }]
        };

		},

		getSplineConfig: function(){

			return {
			
			        options: {
			            chart: {
			            	type:'spline'
			            }

		        },	

        title: {
            text: 'Atmosphere Temperature by Altitude'
        },
        subtitle: {
            text: 'According to the Standard Atmosphere Model'
        },
        xAxis: {
            reversed: false,
            title: {
                enabled: true,
                text: 'Altitude'
            },
            labels: {
                formatter: function () {
                    return this.value + 'km';
                }
            },
            maxPadding: 0.05,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Temperature'
            },
            labels: {
                formatter: function () {
                    return this.value + '\xB0';
                }
            },
            lineWidth: 2
        },
        legend: {
            enabled: false
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: '{point.x} km: {point.y}°C'
        },
        plotOptions: {
            spline: {
                marker: {
                    enable: false
                }
            }
        },
        series: [{
            name: 'Temperature',
            data: [[0, 15], [10, -50], [20, -56.5], [30, -46.5], [40, -22.1],
                [50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5]]
        }]
    };
    }
}
}])

/**
* 	methods for handling our data sources
**/
.factory('DataService', ['$q', '$http', function($q, $http){
	return {

		getGDPTotal: function(){
			var defer = $q.defer();
				self = this;

			$http({
				'method': 'GET',
				'url':'assets/gdp-data-total.json'
			}).then(function(response){
				self.gdpTotal = response.data;
				defer.resolve();
			});

			return defer.promise;

		},

		setCustom: function(country){
			this.custom = [country];

		}

	}
}]);
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
var user = angular.module('User', [
	'User.controllers',
	'User.services'
	]);
var services = angular.module('User.services', [])

.factory('UserService', ['$http', '$q', 'localStorageService', function($http, $q, localStorageService){
	return {


		user: {},
		getUser: function(){
			if(!this.user.token){
				this.user =  localStorageService.get('user');
			}
			return this.user;
		},
		setUser: function(user){
			this.user = user;
			localStorageService.set('user', user);
		},
		login: function(username, password){

			var defer = $q.defer(),
				 self = this;

			console.log("login from UserService");

			$http({
				'method' : 'POST',
				'url' : 'http://localhost:3000/login',
				'data': {
					'username': username,
					'password': password
				}
			}).then(function(response){
				
				self.setUser(response.data);

				defer.resolve(response);

			}, function(error){

				defer.reject(error);
			});

			return defer.promise;

		},
		signup: function(firstName, lastName, username, password){
			var defer = $q.defer();

			$http({
				'method' : 'POST',
				'url' : 'http://localhost:3000/signup',
				'data': {
					'firstName': firstName,
					'lastName': lastName,
					'username': username,
					'password': password
				}
			}).then(function(response){

				defer.resolve(response);
			
			}, function(error) {

				defer.reject(error);
			});

			return defer.promise;
		},

		profile: function(user){
			var defer = $q.defer();

			$http({
				'method' : 'PUT',
				'url' : 'http://localhost:3000/profile/',
				'data': user
			}).then(function(response){

				defer.resolve(response);
			
			}, function(error) {

				defer.reject(error);
			});

			return defer.promise;
		},
	
	};

}]);
