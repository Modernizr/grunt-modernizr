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

			grunt.log.ok(("Success! Saved file to " + config.dest).grey);
			return grunt.file.write(config.dest, code);
		},

		init : function (tests) {
			var deferred = new promise.Deferred(),
				_interval;

			// Cache config 'cause grunt's weird context is going to overwrite it
			var config = grunt.util._.clone(grunt.config("modernizr"));

			// Store options
			var options = config[this.target].options;

			// Echo settings
			grunt.log.writeln();
			grunt.log.ok("Ready to build using these settings:");
			grunt.log.ok(options.join(", ").grey);

			// Check if we are minifying this build
			var minify = config[this.target].uglify;

			if (minify) {
				grunt.log.ok("Your file will be minified with UglifyJS".grey);
			}

			grunt.log.writeln();
			grunt.log.write("Building your customized Modernizr".bold.white);

			if (!_verbose) {
				_interval = setInterval(function () {
					grunt.log.write(".".grey);
				}, 200);
			}

			var Modernizr = require("Modernizr");

			Modernizr.build({
				"feature-detects": tests,
				"options": options,
				"minify": minify,
				"verbose": (_verbose || false)
			}, function (result) {
				grunt.log.ok();
				clearInterval(_interval);

				// Reset config
				grunt.config("modernizr", config);

				// Write code to file
				this.builder.writeCodeToFile(result, config[this.target]);
				return deferred.resolve();
			}.bind(this));

			return deferred.promise;
		}
	};
};
