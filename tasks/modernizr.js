/*
 * grunt-modernizr
 * https://github.com/doctyper/grunt-modernizr
 *
 * Copyright (c) 2012 Richard Herrera
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {

	// ==========================================================================
	// TASKS
	// ==========================================================================

	grunt.registerMultiTask("modernizr", "Build out a lean, mean Modernizr machine.", function (bust) {

		// Require a config object
		this.requiresConfig(this.name);

		// Async
		var done = this.async();

		// The target from our multi-task
		var target = this.target || null;

		// The magic
		var Gruntifier = require("../lib/gruntifier");

		// Go!
		return new Gruntifier(grunt, target, done, bust);
	});

};
