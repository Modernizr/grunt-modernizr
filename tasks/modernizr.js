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
		"extra" : {
			"shiv" : true,
			"printshiv" : false,
			"load" : true,
			"mq" : false,
			"cssclasses" : true
		},

		// Based on default settings on http://modernizr.com/download/
		"extensibility" : {
			"addtest" : false,
			"prefixed" : false,
			"teststyles" : false,
			"testprops" : false,
			"testallprops" : false,
			"hasevents" : false,
			"prefixes" : false,
			"domprefixes" : false
		},

		// By default, source is uglified before saving
		"uglify" : true,

		// Define any tests you want to impliticly include
		"tests" : [],

		// By default, will crawl your project for references to Modernizr tests
		// Set to false to disable
		"parseFiles" : true,

		// By default, this task will crawl all *.js, *.css files.
		"files" : [
			"**/*.{js,css,scss}",
			"!node_modules/**/*",
			"!lib/cache/**/*"
		],

		// Set to true to attempt to match user-contributed tests
		"matchCommunityTests" : false,

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
			"domain" : "http://modernizr.com",
			"modulizr" : "https://github.com/Modernizr/modernizr.com/blob/gh-pages/i/js/modulizr.js#L15-157"
		},

		"core" : [
			"canvastext",
			"csstransforms3d",
			"flexbox",
			"cssgradients",
			"opacity",
			"indexedDB",
			"backgroundsize",
			"borderimage",
			"borderradius",
			"boxshadow",
			"cssanimations",
			"csscolumns",
			"cssreflections",
			"csstransitions",
			"testallprops",
			"flexbox-legacy",
			"prefixed",
			"csstransforms",
			"mq",
			"hashchange",
			"draganddrop",
			"generatedcontent",
			"svg",
			"inlinesvg",
			"smil",
			"svgclippaths",
			"input",
			"inputtypes",
			"touch",
			"fontface",
			"testbundle",
			"respond",
			"websockets",

			/* missing core tests */
			"applicationcache",
			"audio",
			"canvas",
			"geolocation",
			"history",
			"hsla",
			"indexeddb",
			"input",
			"inputtypes",
			"localstorage",
			"multiplebgs",
			"postmessage",
			"scriptdefer",
			"sessionstorage",
			"textshadow",
			"rgba",
			"video",
			"webgl",
			"websqldatabase",
			"webworkers"
		],

		"paths" : {
			"modernizr" : "downloads/modernizr-latest.js",
			"printshiv" : "i/js/html5shiv-printshiv-3.6.js",
			"load" : "i/js/modernizr.load.1.5.4.js",
			"community" : "i/js/modernizr-git/feature-detects/%s.js"
		}
	});

};
