/* jshint node: true */
module.exports = function (grunt, ModernizrPath) {
	"use strict";

	// Config object
	var _quiet = grunt.option("quiet"),
		_verbose = grunt.option("verbose");

	// Dependencies
	var cp = require("child_process"),
		fs = require("fs"),
		path = require("path"),
		colors = require("colors"),
		cwd = process.cwd();

	// Deferreds
	var promise = require("promised-io/promise");

	return {
		writeCodeToFile : function (result, config) {
			var code = config.uglify ? result.min : result.code;

			grunt.log.ok(("Saved file to " + config.outputFile).grey);
			return grunt.file.write(config.outputFile, code);
		},

		init : function (tests) {
			var deferred = new promise.Deferred(),
				_interval;

			// Cache config 'cause grunt's weird context is going to overwrite it
			var config = grunt.config("modernizr");

			grunt.log.writeln();
			grunt.log.write("Building Modernizr".bold.white);

			if (!_verbose) {
				_interval = setInterval(function () {
					grunt.log.write(".".grey);
				}, 250);
			}

			var Modernizr = require("Modernizr");

			Modernizr.build({
				"feature-detects": tests,
				"options": config.options,
				"verbose": (_verbose || false)
			}, function (result) {
				grunt.log.ok();
				clearInterval(_interval);

				// Write code to file
				this.writeCodeToFile(result, config);

				return deferred.resolve();
			}.bind(this));

			return deferred.promise;
		}
	};
};
