module.exports = function (grunt) {
	"use strict";

	grunt.loadNpmTasks("grunt-contrib-clean");

	// Project configuration.
	grunt.initConfig({
		clean: ["build"],
		modernizr: {
			dist: {
				dest: "build/modernizr-custom.js"
			}
		}
	});

	// Load local tasks.
	grunt.loadTasks("tasks");

	// Default task.
	grunt.registerTask("default", [
		"modernizr"
	]);

};
