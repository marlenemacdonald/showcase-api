module.exports = function(grunt){

	var tasksConfig = {
		"clean": {
			"dist": ["dist"]
		},
		"bower_concat": {
			"all": {
				"dest": {
					"js": "dist/app_lib.js",
					"css": "dist/app_lib.css"
				},
				"bowerOptions": {
					"relative": false
				}
			}
		},
		"concat": {
			"css": {
				"files": {
					"dist/app.css": [
						"css/*.css"
					]
				}
			},
			"application": {
				"files": {
						"dist/app.js":[
						"app/*.js",
						"app/*/*.js",
						"app/*/*/*.js",
						"app/*/*/*/*.js"
					]
				}
			}
		},
	

		"watch": {
			"application": {
				"files": [
					"app/*.js",
					"app/*/*.js",
					"app/*/*/*.js",
					"app/*/*/*/*.js"
				],
				"tasks": [
					"dev"
				]
			},
			"css": {
				"files": [
					"css/*.css"
				],
				"tasks": [
					"dev"
				]
			}
		}
	};
	var bowerFile = grunt.file.readJSON('bower.json');

	//initializing time-grunt
	require('time-grunt')(grunt);


	//initializing config
	grunt.initConfig(tasksConfig);


	//inject libraries into grunt
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-rename');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-bower-concat');
	grunt.loadNpmTasks('grunt-bower-task');


	//register tasks

	// 1 clean up dist folder (grunt-contrib-clean)
	// 2 concat all bower libraries (grunt-bower-concat)
	// 3 concat all app files (grunt-contrib-concat)
	// 4 remove .min from index.html (grunt-replace)
	// 5 add option "watch" methold (grunt-contrib-watch)

	grunt.registerTask('dev', function(){
		grunt.task.run([
			'clean:dist',
			'bower_concat',
			'concat',
			'watch'
			]);
	});
	
}