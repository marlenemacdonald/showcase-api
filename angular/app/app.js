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