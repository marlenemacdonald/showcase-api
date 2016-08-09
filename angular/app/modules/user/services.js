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
