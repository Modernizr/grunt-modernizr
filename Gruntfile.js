module.exports = function (grunt) {

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");

	// Project configuration.
	grunt.initConfig({
		nodeunit: {
			files: ["test/**/*.js"]
		},
		watch: {
			files: "<%= jshint.files %>",
			tasks: "default"
		},
		jshint: {
			options: grunt.file.readJSON(".jshintrc"),
			files: [
				"Gruntfile.js",
				"tasks/**/*.js",
				"test/**/*.js"
			]
		},
		modernizr: {}
	});

	// Load local tasks.
	grunt.loadTasks("tasks");

	// Default task.
	grunt.registerTask("default", [
		"jshint"
	]);

};
