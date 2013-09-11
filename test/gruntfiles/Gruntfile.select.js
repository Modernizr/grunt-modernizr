module.exports = function (grunt) {
	"use strict";

	var path = require("path");

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");

	// Project configuration.
	grunt.initConfig({
		nodeunit: {
			files: [
				path.join("test", "**", "*.js")
			]
		},
		watch: {
			files: "<%= jshint.files %>",
			tasks: "default"
		},
		jshint: {
			options: grunt.file.readJSON(".jshintrc"),
			files: [
				path.join("Gruntfile.js"),
				path.join("tasks", "**", "*.js"),
				path.join("test", "**", "*.js")
			]
		},
		modernizr: {
			dist: {
        "dest": "build/modernizr-select.js",
        "tests": [
          "webintents",
          "siblinggeneral",
          "svgclippaths"
        ],
        "crawl": false,
        "uglify": false
      }
		}
	});

	// Load local tasks.
	grunt.loadTasks("tasks");

	// Default task.
	grunt.registerTask("default", [
		"jshint"
	]);

};
