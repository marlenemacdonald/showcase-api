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