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
		"outputFile" : "build/modernizr-custom.js",

		// Based on default settings on http://modernizr.com/download/
		"options" : [
			"setClasses",
			"addTest",
			"html5printshiv",
			"load",
			"testProp",
			"fnBind"
		],

		// By default, source is uglified before saving
		"uglify" : true,

		// If uglify is true, an accompanying source map is generated as well
		"generateSourceMap" : true,

		// Define any tests you want to impliticly include
		"tests" : [],

		// By default, will crawl your project for references to Modernizr tests
		// Set to false to disable
		"parseFiles" : true,

		// By default, this task will crawl all *.js, *.css files.
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

	grunt.registerTask("modernizr", "Build out a lean, mean Modernizr machine.", function (bust) {

		// Require a config object
		this.requiresConfig(this.name);

		// Async
		var done = this.async();

		// The magic
		var Gruntifier = require("../lib/gruntifier");

		// Go!
		return new Gruntifier(grunt, done, bust);
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
