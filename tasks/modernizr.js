/*
 * grunt-modernizr
 * https://github.com/doctyper/grunt-modernizr
 *
 * Copyright (c) 2012 Richard Herrera
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {

	// ==========================================================================
	// DEFAULT CONFIG
	// ==========================================================================

	grunt.option("_modernizr.defaults", {
		// Path to the build you're using for development.
		"devFile" : "lib/modernizr-dev.js",

		// Path to save out the built file
		"dest" : "build/modernizr-custom.js",

		// Based on default settings on http://modernizr.com/download/
		"options" : [
			"setClasses",
			"addTest",
			"html5printshiv",
			// "load",
			"testProp",
			"fnBind"
		],

		// By default, source is uglified before saving
		"uglify" : true,

		// Define any tests you want to impliticly include
		"tests" : [],

		// By default, will crawl your project for references to Modernizr tests
		// Set to false to disable
		"crawl" : true,

		// By default, this task will crawl all *.js, *.css, *.scss files.
		"files" : [
			"**/*.{js,css,scss}",
			"!node_modules/**/*",
			"!{Gruntfile,grunt}.js"
		],

		// Have custom Modernizr tests? Add them here.
		"customTests" : []
	});

	// ==========================================================================
	// TASKS
	// ==========================================================================

	grunt.registerMultiTask("modernizr", "Build out a lean, mean Modernizr machine.", function () {

		// Require a config object
		this.requiresConfig(this.name);

		// Async
		var done = this.async();

		// The target from our multi-task
		var target = this.target || null;

		// The magic
		var Customizr = require("../src");

		// Go!
		return new Customizr(grunt, target, done);
	});

	// ==========================================================================
	// PRIVATE CONFIG
	// ==========================================================================

	grunt.option("_modernizr.private", {
		"url" : {
			"github" : "https://github.com/doctyper/grunt-modernizr",
			"domain" : "http://modernizr.com"
		}
	});

};
