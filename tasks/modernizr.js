/*
 * grunt-modernizr
 * https://github.com/doctyper/grunt-modernizr
 *
 * Copyright (c) 2012 Richard Herrera
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {

	// ==========================================================================
	// LOAD SETTINGS
	// ==========================================================================

	var path = require("path");
	var settings = grunt.file.readJSON(path.join(__dirname, "..", "src", "settings.json"));

	// ==========================================================================
	// TASKS
	// ==========================================================================

	grunt.registerMultiTask("modernizr", "Build out a lean, mean Modernizr machine.", function () {

		// Require a config object
		this.requiresConfig(this.name);

		// Async
		var done = this.async();

		// The magic
		var Customizr = require("customizr");

		// Go!
		return new Customizr(this.data, done);
	});

};
